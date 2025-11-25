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
    const { templateId, image1, image2, isCouple } = JSON.parse(event.body);

    if (!templateId || !image1) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required parameters: templateId, image1' })
      };
    }

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

    // Upload slike na Replicate storage prvo (kao u screenshotu - koristi URL-ove)
    const image1Base64 = image1.includes(',') ? image1.split(',')[1] : image1;
    const image1Buffer = Buffer.from(image1Base64, 'base64');
    
    console.log('Uploading image1 to Replicate storage...');
    const image1UploadResponse = await fetch('https://api.replicate.com/v1/files', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'image/jpeg'
      },
      body: image1Buffer
    });

    if (!image1UploadResponse.ok) {
      const errorText = await image1UploadResponse.text();
      console.error('Failed to upload image1:', errorText);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to upload image1 to Replicate', details: errorText })
      };
    }

    const image1File = await image1UploadResponse.json();
    const image1Url = image1File.url || image1File;
    console.log('Image1 uploaded:', image1Url);

    let image2Url = null;
    if (!isCouple && image2) {
      const image2Base64 = image2.includes(',') ? image2.split(',')[1] : image2;
      const image2Buffer = Buffer.from(image2Base64, 'base64');
      
      console.log('Uploading image2 to Replicate storage...');
      const image2UploadResponse = await fetch('https://api.replicate.com/v1/files', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'image/jpeg'
        },
        body: image2Buffer
      });

      if (image2UploadResponse.ok) {
        const image2File = await image2UploadResponse.json();
        image2Url = image2File.url || image2File;
        console.log('Image2 uploaded:', image2Url);
      } else {
        console.warn('Failed to upload image2, continuing without it');
      }
    }

    // Logo URL
    const logoUrl = 'https://examples.b-cdn.net/logo.jpg';

    // Pozovi Replicate API s URL-ovima (kao u screenshotu)
    const inputData = {
      prompt: prompt,
      image: image1Url,  // Koristi URL umjesto base64
      logo: logoUrl,
      logo_position: 'bottom-right',
      logo_size: 0.12,
      logo_opacity: 0.75,
      num_outputs: 1,
      guidance_scale: 9.0,  // Povećano za bolju face consistency
      num_inference_steps: 50
    };

    // Ako nije couple i ima image2, dodaj image2
    if (!isCouple && image2Url) {
      inputData.image2 = image2Url;
    }

    console.log('Calling Replicate API with:', {
      templateId,
      isCouple,
      hasImage2: !!image2DataUri,
      promptLength: prompt.length
    });

    const replicateResponse = await fetch('https://api.replicate.com/v1/models/google/nano-banana-pro/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: inputData
      })
    });

    // Provjeri response
    const responseText = await replicateResponse.text();
    console.log('Replicate response status:', replicateResponse.status);
    console.log('Replicate response:', responseText.substring(0, 200));

    if (!replicateResponse.ok) {
      let errorDetails;
      try {
        errorDetails = JSON.parse(responseText);
      } catch (e) {
        errorDetails = responseText;
      }
      console.error('Replicate API error:', errorDetails);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Replicate API error', 
          details: errorDetails,
          status: replicateResponse.status
        })
      };
    }

    let prediction;
    try {
      prediction = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Replicate response:', e);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid response from Replicate API',
          details: responseText.substring(0, 500)
        })
      };
    }
    
    // Čekaj da se generacija završi
    let result = prediction;
    let maxWaitTime = 300; // Max 5 minuta
    let waitCount = 0;
    
    while ((result.status === 'starting' || result.status === 'processing') && waitCount < maxWaitTime) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      waitCount++;
      
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`
        }
      });
      
      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        throw new Error(`Status check failed: ${statusResponse.status} - ${errorText}`);
      }
      
      const statusText = await statusResponse.text();
      try {
        result = JSON.parse(statusText);
      } catch (e) {
        console.error('Failed to parse status response:', statusText.substring(0, 200));
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
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Generation failed', details: result.error })
      };
    }

    const imageUrl = result.output && result.output[0] ? result.output[0] : result.output;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        imageUrl: imageUrl,
        predictionId: result.id
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

