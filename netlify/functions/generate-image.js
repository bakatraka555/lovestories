/**
 * Netlify Function za generiranje slike preko Replicate API
 * 
 * Prima:
 * - templateId: ID templatea
 * - image1: Base64 encoded muško lice (ili couple image)
 * - image2: Base64 encoded žensko lice (opciono, ako nije couple)
 * - isCouple: boolean - da li je 1 slika s parom ili 2 odvojene
 * 
 * Vraća:
 * - imageUrl: URL generirane slike
 */

const fetch = require('node-fetch');
const { getPrompt } = require('./prompts');

exports.handler = async (event, context) => {
  // Log svaki poziv funkcije
  console.log('=== generate-image function called ===');
  console.log('HTTP Method:', event.httpMethod);
  console.log('Path:', event.path);
  console.log('Has body:', !!event.body);
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    console.log('OPTIONS request - returning CORS headers');
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    console.log('Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        error: 'Method not allowed',
        message: 'This function only accepts POST requests',
        receivedMethod: event.httpMethod,
        expectedMethod: 'POST',
        functionName: 'generate-image',
        path: event.path
      })
    };
  }

  try {
    console.log('Parsing request body...');
    const body = JSON.parse(event.body);
    console.log('Request body parsed. Keys:', Object.keys(body));
    console.log('Has templateId:', !!body.templateId);
    console.log('Has image1:', !!body.image1);
    console.log('Has image2:', !!body.image2);
    console.log('isCouple:', body.isCouple);
    
    const { templateId, image1, image2, isCouple } = body;

    if (!templateId || !image1) {
      console.log('Missing required parameters');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required parameters: templateId, image1' })
      };
    }
    
    console.log('All parameters present, proceeding...');

    const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
    if (!REPLICATE_API_TOKEN) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'REPLICATE_API_TOKEN not configured' })
      };
    }

    // Učitaj template database za prompt
    const templates = require('../../docs/couples-templates-database.json');
    const template = templates.templates.find(t => t.id === templateId);
    
    if (!template) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Template not found' })
      };
    }

    // Učitaj prompt iz MD filea
    const prompt = getPrompt(template.id, isCouple);
    console.log('Using prompt from MD file for:', template.id, 'isCouple:', isCouple);

    // Helper funkcija za upload na Bunny.net
    const uploadToBunny = async (imageBase64, filename) => {
      const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
      const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE;
      
      console.log('Bunny.net config check:', { 
        hasApiKey: !!BUNNY_API_KEY, 
        hasStorageZone: !!BUNNY_STORAGE_ZONE,
        storageZone: BUNNY_STORAGE_ZONE ? BUNNY_STORAGE_ZONE.substring(0, 10) + '...' : 'missing',
        apiKeyLength: BUNNY_API_KEY ? BUNNY_API_KEY.length : 0
      });
      
      if (!BUNNY_API_KEY || !BUNNY_STORAGE_ZONE) {
        console.error('Bunny.net config missing:', { 
          hasApiKey: !!BUNNY_API_KEY, 
          hasStorageZone: !!BUNNY_STORAGE_ZONE 
        });
        throw new Error('Bunny.net API not configured - check BUNNY_API_KEY and BUNNY_STORAGE_ZONE environment variables in Netlify Dashboard');
      }

      try {
        const imageBuffer = Buffer.from(imageBase64, 'base64');
        const uploadUrl = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${filename}`;
        
        console.log('Uploading to Bunny.net:', uploadUrl.substring(0, 100) + '...');
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
            error: responseText,
            url: uploadUrl.substring(0, 80) + '...',
            headers: {
              hasAccessKey: !!BUNNY_API_KEY,
              accessKeyLength: BUNNY_API_KEY.length
            }
          });
          
          if (uploadResponse.status === 401) {
            throw new Error('Bunny.net 401 Unauthorized - check BUNNY_API_KEY and BUNNY_STORAGE_ZONE in Netlify Environment Variables. Make sure API key is correct and Storage Zone name matches exactly.');
          }
          
          throw new Error(`Bunny.net upload failed (${uploadResponse.status}): ${responseText}`);
        }

        // Koristi CDN URL (Pull Zone) - Storage Zone nije javno dostupan bez autentifikacije
        // Format: https://{cdn-domain}/{filename}
        // Ako CDN domain nije konfiguriran, koristi Storage Zone FTP hostname format
        const cdnDomain = process.env.BUNNY_CDN_DOMAIN || `${BUNNY_STORAGE_ZONE}.bunnycdn.com`;
        const publicUrl = `https://${cdnDomain}/${filename}`;
        console.log('Upload successful, Public URL:', publicUrl);
        return publicUrl;
      } catch (error) {
        console.error('Error in uploadToBunny:', error);
        throw error;
      }
    };

    // 1. Upload slike na Bunny.net prvo
    let image1Url, image2Url;
    
    try {
      const image1Base64 = image1.includes(',') ? image1.split(',')[1] : image1;
      const timestamp = Date.now();
      const userId = `user-${timestamp}-${Math.random().toString(36).substr(2, 9)}`;
      
      console.log('Uploading image1 to Bunny.net...');
      const image1Filename = `temp/${userId}-image1.jpg`;
      image1Url = await uploadToBunny(image1Base64, image1Filename);
      console.log('Image1 uploaded to Bunny.net:', image1Url);

      if (!isCouple && image2) {
        const image2Base64 = image2.includes(',') ? image2.split(',')[1] : image2;
        console.log('Uploading image2 to Bunny.net...');
        const image2Filename = `temp/${userId}-image2.jpg`;
        image2Url = await uploadToBunny(image2Base64, image2Filename);
        console.log('Image2 uploaded to Bunny.net:', image2Url);
      } else {
        image2Url = null;
      }
    } catch (uploadError) {
      console.error('Error uploading images to Bunny.net:', uploadError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to upload images to Bunny.net', 
          details: uploadError.message 
        })
      };
    }

    // Logo URL (već je na Bunny.net)
    const logoUrl = 'https://examples.b-cdn.net/logo.jpg';

    // Pripremi image_input array (kao u tvom uspješnom primjeru)
    const imageInput = [image1Url];
    if (!isCouple && image2Url) {
      imageInput.push(image2Url);
    }
    imageInput.push(logoUrl); // Logo je uvijek zadnji

    // Pozovi Replicate API s URL-ovima (kao u tvom uspješnom primjeru)
    const inputData = {
      prompt: prompt,
      image_input: imageInput,  // Array: [couple_image, logo] ili [male_image, female_image, logo]
      aspect_ratio: 'match_input_image',  // Default prema Replicate UI (može biti i '4:3', '9:16', itd.)
      output_format: 'jpg',  // Default prema Replicate UI (može biti i 'png')
      resolution: '2K',
      safety_filter_level: 'block_only_high'
    };

    console.log('Calling Replicate API with:', {
      templateId,
      isCouple,
      hasImage2: !!image2Url,
      image1Url: image1Url.substring(0, 50) + '...',
      image2Url: image2Url ? image2Url.substring(0, 50) + '...' : null,
      logoUrl: logoUrl,
      promptLength: prompt.length
    });

    // Replicate API poziv (bez Prefer: wait - koristimo polling kao u dokumentaciji)
    const replicateResponse = await fetch('https://api.replicate.com/v1/models/google/nano-banana-pro/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,  // Replicate API koristi Bearer (kao u dokumentaciji)
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: inputData
      })
    });

    // Provjeri response
    console.log('Replicate response status:', replicateResponse.status);
    
    // Parse JSON response (201 Created je uspješan odgovor)
    let prediction;
    try {
      prediction = await replicateResponse.json();
      
      if (!replicateResponse.ok) {
        console.error('Replicate API error:', prediction);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Replicate API error', 
            details: prediction,
            status: replicateResponse.status
          })
        };
      }
      
      console.log('Replicate prediction created:', {
        id: prediction.id,
        status: prediction.status,
        urls: prediction.urls,
        output: prediction.output
      });
    } catch (e) {
      console.error('Failed to parse Replicate response:', e);
      console.error('Error details:', e.message, e.stack);
      
      // Ako je greška u parsiranju, pokušaj pročitati kao text
      try {
        const errorText = await replicateResponse.text();
        console.error('Response text:', errorText.substring(0, 500));
      } catch (textError) {
        console.error('Could not read response as text:', textError);
      }
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid response from Replicate API',
          details: e.message
        })
      };
    }
    
    // Provjeri da li ima prediction ID
    if (!prediction || !prediction.id) {
      console.error('Invalid prediction response:', prediction);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid prediction response from Replicate',
          details: 'Missing prediction ID'
        })
      };
    }
    
    console.log('Prediction created, ID:', prediction.id, 'Status:', prediction.status);
    
    // Polling za rezultat (kao u dokumentaciji i tvom uspješnom primjeru)
    let result = prediction;
    let maxWaitTime = 300; // Max 5 minuta
    let waitCount = 0;
    
    while ((result.status === 'starting' || result.status === 'processing') && waitCount < maxWaitTime) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Čekaj 2 sekunde
      waitCount++;
      
      console.log(`Checking prediction status (attempt ${waitCount}/${maxWaitTime})...`);
      
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Bearer ${REPLICATE_API_TOKEN}`  // Replicate API koristi Bearer
        }
      });
      
      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('Status check failed:', statusResponse.status, errorText);
        throw new Error(`Status check failed: ${statusResponse.status} - ${errorText}`);
      }
      
      try {
        result = await statusResponse.json();
        console.log(`Prediction status: ${result.status} (attempt ${waitCount})`);
      } catch (e) {
        console.error('Failed to parse status response:', e);
        throw new Error('Invalid status response from Replicate');
      }
    }
    
    if (waitCount >= maxWaitTime) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Generation timeout', predictionId: result.id })
      };
    }

    if (result.status === 'failed') {
      console.error('Generation failed:', result.error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Generation failed', details: result.error })
      };
    }

    if (result.status !== 'succeeded') {
      console.error('Unexpected status:', result.status);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Generation not completed', 
          status: result.status
        })
      };
    }

    // Output je string URL (kao u tvom uspješnom primjeru)
    const imageUrl = result.output;
    
    if (!imageUrl) {
      console.error('No image URL in output:', result);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'No image URL in response',
          details: 'Output is empty'
        })
      };
    }
    
    console.log('Generation successful, image URL:', imageUrl);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        imageUrl: imageUrl,
        predictionId: prediction.id
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};

// createPrompt funkcija je uklonjena - sada koristimo getPrompt iz prompts.js

