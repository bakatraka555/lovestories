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

    // Kreiraj prompt za template
    const prompt = createPrompt(template);

    // Download logo s CDN-a
    const logoResponse = await fetch('https://examples.b-cdn.net/logo.jpg');
    const logoArrayBuffer = await logoResponse.arrayBuffer();
    const logoBuffer = Buffer.from(logoArrayBuffer);

    // Konvertuj base64 slike u buffer
    const image1Base64 = image1.includes(',') ? image1.split(',')[1] : image1;
    const image1Buffer = Buffer.from(image1Base64, 'base64');
    
    let image2Buffer = null;
    if (!isCouple && image2) {
      const image2Base64 = image2.includes(',') ? image2.split(',')[1] : image2;
      image2Buffer = Buffer.from(image2Base64, 'base64');
    }

    // Pozovi Replicate API
    const replicateResponse = await fetch('https://api.replicate.com/v1/models/google/nano-banana-pro/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: {
          prompt: prompt,
          image: `data:image/jpeg;base64,${image1Buffer.toString('base64')}`,
          ...(image2Buffer && {
            image2: `data:image/jpeg;base64,${image2Buffer.toString('base64')}`
          }),
          logo: `data:image/jpeg;base64,${logoBuffer.toString('base64')}`,
          logo_position: 'bottom-right',
          logo_size: 0.12,
          logo_opacity: 0.75,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50
        }
      })
    });

    if (!replicateResponse.ok) {
      const error = await replicateResponse.text();
      console.error('Replicate API error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Replicate API error', details: error })
      };
    }

    const prediction = await replicateResponse.json();
    
    // Čekaj da se generacija završi
    let result = prediction;
    while (result.status === 'starting' || result.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`
        }
      });
      
      result = await statusResponse.json();
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

function createPrompt(template) {
  const prompts = {
    'template-01': {
      scene: 'Romantic couple in elegant 1920s style clothing, vintage fashion, art deco aesthetic',
      location: 'Vintage setting, 1920s atmosphere, glamorous environment, period-appropriate background',
      style: 'Black and white or sepia tone, art deco style, timeless elegance, glamorous, sophisticated'
    },
    'template-02': {
      scene: 'King and queen in Dubrovnik, Game of Thrones style, majestic and regal, epic fantasy',
      location: 'Dubrovnik old town, Stradun, medieval architecture in background, Croatian landmarks visible',
      style: 'Epic fantasy, cinematic, dramatic lighting, royal atmosphere, medieval aesthetic'
    },
    'template-03': {
      scene: 'Romantic couple on beach during sunset, warm golden hour lighting, ocean waves',
      location: 'Beautiful beach, ocean waves, sunset sky, romantic beach setting',
      style: 'Warm colors, golden hour, romantic atmosphere, natural lighting, cinematic'
    }
    // Dodaj ostale templatee prema potrebi
  };

  const templatePrompt = prompts[template.id] || {
    scene: 'Romantic couple',
    location: 'Beautiful location',
    style: 'Cinematic, professional'
  };

  return `Ultra-photorealistic, highly cinematic photograph.

CRITICAL: INPUT IMAGE PROCESSING
- TWO INPUT IMAGES:
  * IMAGE 1: MALE FACE (reference model - use this face for male person)
  * IMAGE 2: FEMALE FACE (reference model - use this face for female person)
- ONE LOGO IMAGE (Love Stories Museum logo)

FACE RECOGNITION & CONSISTENCY:
- LOAD and ANALYZE both input images
- IDENTIFY the male person from IMAGE 1 - recognize ALL facial features, bone structure, distinctive characteristics
- IDENTIFY the female person from IMAGE 2 - recognize ALL facial features, bone structure, distinctive characteristics
- MAINTAIN MAXIMUM RECOGNIZABILITY for both faces across ALL generations
- PRESERVE all distinctive facial features from both reference images
- KEEP both faces 100% ACCURATE from their reference images
- DO NOT alter facial structure, bone structure, eye shape, nose shape, mouth shape, or any distinctive features
- CONSISTENT faces across all images and videos - same male person, same female person, same faces
- The male person from IMAGE 1 must appear in ALL generated images with the SAME face
- The female person from IMAGE 2 must appear in ALL generated images with the SAME face

LOGO INTEGRATION:
- LOAD the logo image
- REMOVE white background (make transparent)
- PLACE in BOTTOM RIGHT CORNER
- SIZE: 10-15% of image width
- OPACITY: 70-80%

SCENE: ${templatePrompt.scene}
LOCATION: ${templatePrompt.location}
STYLE: ${templatePrompt.style}

COMPOSITION:
- Both people should be clearly visible in the scene
- Natural interaction between the couple
- Professional photography quality
- High resolution, sharp details
- Balanced composition with both faces clearly visible`;
}

