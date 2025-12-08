/**
 * Netlify Function za upload korisničkih slika na Bunny.net
 * 
 * Prima FormData (multipart/form-data) umjesto base64 za manji overhead:
 * - image: File blob (binary data)
 * - filename: Ime fajla za upload
 * 
 * Vraća:
 * - url: CDN URL uploadane slike
 * - success: boolean
 */

const fetch = require('node-fetch');
const busboy = require('busboy');

exports.handler = async (event, context) => {
  console.log('=== upload-user-image function called ===');
  console.log('HTTP Method:', event.httpMethod);
  console.log('Path:', event.path);
  console.log('Has body:', !!event.body);
  console.log('Body length:', event.body ? event.body.length : 0);
  console.log('Content-Type:', event.headers['content-type'] || event.headers['Content-Type']);
  
  // CORS headers - poboljšano za Android
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    const isFormData = contentType.includes('multipart/form-data');
    const isJson = contentType.includes('application/json');
    
    console.log('Content type detected:', { isFormData, isJson, contentType });
    
    let imageBuffer;
    let filename;
    
    if (isFormData) {
      // Parse multipart/form-data using busboy
      console.log('Parsing multipart/form-data...');
      
      const result = await new Promise((resolve, reject) => {
        const bb = busboy({ 
          headers: {
            'content-type': contentType
          }
        });
        
        let fileBuffer;
        let fileName;
        const fields = {};
        
        bb.on('file', (fieldname, file, info) => {
          console.log(`File field: ${fieldname}, filename: ${info.filename}`);
          const chunks = [];
          
          file.on('data', (data) => {
            chunks.push(data);
          });
          
          file.on('end', () => {
            fileBuffer = Buffer.concat(chunks);
            console.log(`File ${fieldname} received: ${fileBuffer.length} bytes`);
          });
        });
        
        bb.on('field', (fieldname, value) => {
          console.log(`Field ${fieldname}: ${value}`);
          fields[fieldname] = value;
        });
        
        bb.on('finish', () => {
          resolve({ fileBuffer, fields });
        });
        
        bb.on('error', (error) => {
          reject(error);
        });
        
        // Netlify Functions daju body kao base64 string ako je binary
        const bodyBuffer = event.isBase64Encoded 
          ? Buffer.from(event.body, 'base64')
          : Buffer.from(event.body);
        
        bb.write(bodyBuffer);
        bb.end();
      });
      
      imageBuffer = result.fileBuffer;
      filename = result.fields.filename;
      
      if (!imageBuffer || !filename) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            error: 'Missing required parameters',
            details: 'Both image file and filename are required'
          })
        };
      }
      
    } else if (isJson) {
      // JSON format (backward compatibility)
      console.log('JSON format detected (backward compatibility)');
      const body = JSON.parse(event.body);
      const { imageBase64, filename: fn } = body;
      
      if (!imageBase64 || !fn) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            error: 'Missing required parameters',
            details: 'Both imageBase64 and filename are required'
          })
        };
      }
      
      const base64Data = imageBase64.includes(',') 
        ? imageBase64.split(',')[1] 
        : imageBase64;
      imageBuffer = Buffer.from(base64Data, 'base64');
      filename = fn;
      
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Unsupported content type',
          details: 'Expected multipart/form-data or application/json'
        })
      };
    }
    
    console.log('Request parsed:', {
      imageBufferSize: imageBuffer.length,
      filename: filename
    });

    const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
    const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE;
    const BUNNY_CDN_DOMAIN = process.env.BUNNY_CDN_DOMAIN || 'examples.b-cdn.net';

    if (!BUNNY_API_KEY || !BUNNY_STORAGE_ZONE) {
      console.error('Bunny.net configuration missing:', {
        hasApiKey: !!BUNNY_API_KEY,
        hasStorageZone: !!BUNNY_STORAGE_ZONE
      });
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Bunny.net API not configured',
          details: 'Check BUNNY_API_KEY and BUNNY_STORAGE_ZONE environment variables'
        })
      };
    }

    // Upload path - koristi temp folder
    const uploadPath = `temp/${filename}`;
    const uploadUrl = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${uploadPath}`;
    
    console.log('Uploading to Bunny.net:', uploadUrl.substring(0, 80) + '...');
    console.log('File size:', imageBuffer.length, 'bytes');
    
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'AccessKey': BUNNY_API_KEY,
        'Content-Type': 'image/jpeg'
      },
      body: imageBuffer
    });

    const responseText = await uploadResponse.text();

    if (!uploadResponse.ok) {
      console.error('Bunny.net upload error:', {
        status: uploadResponse.status,
        statusText: uploadResponse.statusText,
        error: responseText
      });
      
      if (uploadResponse.status === 401) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Bunny.net authentication failed',
            details: 'Check BUNNY_API_KEY in Netlify environment variables'
          })
        };
      }
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Upload failed',
          details: responseText || uploadResponse.statusText,
          status: uploadResponse.status
        })
      };
    }

    // CDN URL
    const publicUrl = `https://${BUNNY_CDN_DOMAIN}/${uploadPath}`;
    console.log('Upload successful! Public URL:', publicUrl);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        url: publicUrl,
        filename: filename,
        size: imageBuffer.length
      })
    };

  } catch (error) {
    console.error('Error in upload-user-image:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message,
        stack: error.stack
      })
    };
  }
};

