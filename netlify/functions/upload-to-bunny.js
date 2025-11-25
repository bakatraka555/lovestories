/**
 * Netlify Function za upload generirane slike na Bunny.net Storage
 * 
 * Prima:
 * - imageUrl: URL generirane slike (s Replicate)
 * - templateId: ID templatea
 * - userId: ID korisnika (opcionalno)
 * 
 * Vraća:
 * - cdnUrl: CDN URL uploadane slike
 */

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
    const { imageUrl, templateId, userId } = JSON.parse(event.body);

    if (!imageUrl || !templateId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required parameters: imageUrl, templateId' })
      };
    }

    const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
    const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE;

    if (!BUNNY_API_KEY || !BUNNY_STORAGE_ZONE) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Bunny.net API not configured' })
      };
    }

    // Download sliku s Replicate URL-a
    console.log('Downloading image from:', imageUrl);
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }
    const imageArrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);

    // Generiraj unique filename
    const timestamp = Date.now();
    const filename = userId 
      ? `${templateId}/user-${userId}-${timestamp}.jpg`
      : `${templateId}/generated-${timestamp}.jpg`;

    // Upload na Bunny.net Storage
    const uploadUrl = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${filename}`;
    
    console.log('Uploading to:', uploadUrl);
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'AccessKey': BUNNY_API_KEY,
        'Content-Type': 'image/jpeg'
      },
      body: imageBuffer
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('Bunny.net upload error:', errorText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Upload failed', 
          details: errorText,
          status: uploadResponse.status
        })
      };
    }

    // CDN URL
    const cdnUrl = `https://lovestories-cdn.b-cdn.net/${filename}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        cdnUrl: cdnUrl,
        filename: filename
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

