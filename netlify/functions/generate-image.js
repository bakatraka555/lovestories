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

    // Kreiraj prompt za template (s logo URL-om)
    const prompt = createPrompt(template, isCouple);

    // Upload slike na Replicate storage prvo (Replicate API očekuje URL-ove ili file objekte)
    // Za sada koristimo base64 data URI format
    const image1Base64 = image1.includes(',') ? image1.split(',')[1] : image1;
    const image1DataUri = `data:image/jpeg;base64,${image1Base64}`;
    
    let image2DataUri = null;
    if (!isCouple && image2) {
      const image2Base64 = image2.includes(',') ? image2.split(',')[1] : image2;
      image2DataUri = `data:image/jpeg;base64,${image2Base64}`;
    }

    // Logo URL direktno u promptu
    const logoUrl = 'https://examples.b-cdn.net/logo.jpg';

    // Pozovi Replicate API
    const inputData = {
      prompt: prompt,
      image: image1DataUri,
      logo: logoUrl,  // Koristi URL umjesto base64
      logo_position: 'bottom-right',
      logo_size: 0.12,
      logo_opacity: 0.75,
      num_outputs: 1,
      guidance_scale: 7.5,
      num_inference_steps: 50
    };

    // Ako nije couple i ima image2, dodaj image2
    if (!isCouple && image2DataUri) {
      inputData.image2 = image2DataUri;
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

function createPrompt(template, isCouple) {
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
    },
    'template-04': {
      scene: 'Couple in city at night with bokeh lights, glamorous, sophisticated, urban atmosphere',
      location: 'Urban city setting, night time, city lights, bokeh effects',
      style: 'Glamorous, sophisticated, cinematic, urban night photography'
    },
    'template-05': {
      scene: 'Romantic wedding in garden setting, flowers, natural light, elegant and romantic atmosphere',
      location: 'Beautiful garden, flowers, natural setting, wedding atmosphere',
      style: 'Elegant, romantic, natural lighting, wedding photography'
    },
    'template-06': {
      scene: 'Elegant couple at poker table, sophisticated, glamorous, casino atmosphere',
      location: 'Casino setting, poker table, elegant environment',
      style: 'Glamorous, sophisticated, casino aesthetic, elegant'
    },
    'template-07': {
      scene: 'Cute 3D chibi characters, kawaii style, sweet and romantic, colorful',
      location: '3D chibi style environment, colorful, kawaii aesthetic',
      style: '3D chibi, kawaii, cute, colorful, sweet'
    },
    'template-08': {
      scene: 'Epic trading card design, dynamic composition, fantasy elements, dramatic lighting',
      location: 'Trading card style environment, epic fantasy setting',
      style: 'Epic, dynamic, fantasy, trading card aesthetic, dramatic'
    },
    'template-09': {
      scene: 'Romantic couple in Dubrovnik at sunrise, St. Vlaho church in background, warm morning light',
      location: 'Dubrovnik, St. Vlaho church, sunrise, Croatian landmarks',
      style: 'Travel photography, cinematic, warm morning light, professional'
    },
    'template-10': {
      scene: '3D big head caricature, adventure theme, volcano background, fun and playful',
      location: 'Volcano setting, adventure environment, 3D style',
      style: '3D caricature, fun, playful, adventure, big head style'
    },
    'template-11': {
      scene: 'Social media aesthetic, finger heart gesture, modern, trendy, colorful',
      location: 'Modern social media setting, trendy environment',
      style: 'Social media, Instagram frame style, modern, trendy, colorful'
    },
    'template-12': {
      scene: 'Couple as 3D collectible figures in box, premium quality, detailed, collectible style',
      location: 'Collectible box setting, 3D figure display',
      style: '3D collectible, premium quality, detailed, collectible aesthetic'
    },
    'template-13': {
      scene: 'Professional travel photograph, Dubrovnik location, cinematic composition',
      location: 'Dubrovnik, travel destination, Croatian landmarks',
      style: 'Professional travel photography, cinematic, high quality'
    }
  };

  const templatePrompt = prompts[template.id] || {
    scene: 'Romantic couple',
    location: 'Beautiful location',
    style: 'Cinematic, professional'
  };

  // Različiti prompt ovisno o tome je li couple ili odvojene slike
  if (isCouple) {
    return `Ultra-photorealistic, highly cinematic photograph.

CRITICAL: INPUT IMAGE PROCESSING
- ONE INPUT IMAGE: COUPLE IMAGE (contains both MALE and FEMALE person together)
- ONE LOGO IMAGE: https://examples.b-cdn.net/logo.jpg

FACE RECOGNITION & CONSISTENCY:
- LOAD and ANALYZE the input couple image
- IDENTIFY the MALE person from the couple image - recognize ALL facial features, bone structure, distinctive characteristics
- IDENTIFY the FEMALE person from the couple image - recognize ALL facial features, bone structure, distinctive characteristics
- MAINTAIN MAXIMUM RECOGNIZABILITY for both faces across ALL generations
- PRESERVE all distinctive facial features from both people in the reference image
- KEEP both faces 100% ACCURATE from their reference image
- DO NOT alter facial structure, bone structure, eye shape, nose shape, mouth shape, or any distinctive features
- CONSISTENT faces across all images and videos - same male person, same female person, same faces
- The male person from the couple image must appear in ALL generated images with the SAME face
- The female person from the couple image must appear in ALL generated images with the SAME face
- EXTRACT both faces from the single couple image and use them as reference models

LOGO INTEGRATION:
- LOAD the logo image from: https://examples.b-cdn.net/logo.jpg
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
  } else {
    return `Ultra-photorealistic, highly cinematic photograph.

CRITICAL: INPUT IMAGE PROCESSING
- TWO INPUT IMAGES:
  * IMAGE 1: MALE FACE (reference model - use this face for male person)
  * IMAGE 2: FEMALE FACE (reference model - use this face for female person)
- ONE LOGO IMAGE: https://examples.b-cdn.net/logo.jpg

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
- LOAD the logo image from: https://examples.b-cdn.net/logo.jpg
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
}

