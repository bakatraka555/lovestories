/**
 * Prompt templates - hardcoded jer Netlify Functions ne uključuje docs/ folder
 */

// Hardcoded promptovi iz NANO_BANANA_PROMPT.md
const prompts = {
  'template-01': `Ultra-photorealistic, highly cinematic vintage 1920s photograph.

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

SCENE: Romantic couple in elegant 1920s style clothing, vintage fashion, art deco aesthetic
LOCATION: Vintage setting, 1920s atmosphere, glamorous environment, period-appropriate background
STYLE: Black and white or sepia tone, art deco style, timeless elegance, glamorous, sophisticated
COMPOSITION: Both people in period-appropriate clothing, natural romantic interaction, professional vintage photography quality, high resolution, sharp details, balanced composition with both faces clearly visible`,

  'template-02': `Ultra-photorealistic, highly cinematic medieval fantasy photograph.

CRITICAL: INPUT IMAGE PROCESSING
- TWO INPUT IMAGES:
  * IMAGE 1: MALE FACE (reference model - will be KING, use this face)
  * IMAGE 2: FEMALE FACE (reference model - will be QUEEN, use this face)
- ONE LOGO IMAGE (Love Stories Museum logo)

FACE RECOGNITION & CONSISTENCY:
- LOAD and ANALYZE both input images
- IDENTIFY the male person from IMAGE 1 - recognize ALL facial features, bone structure, distinctive characteristics (KING)
- IDENTIFY the female person from IMAGE 2 - recognize ALL facial features, bone structure, distinctive characteristics (QUEEN)
- MAINTAIN MAXIMUM RECOGNIZABILITY for both faces across ALL generations
- PRESERVE all distinctive facial features from both reference images
- KEEP both faces 100% ACCURATE from their reference images
- DO NOT alter facial structure, bone structure, eye shape, nose shape, mouth shape, or any distinctive features
- CONSISTENT faces across all images and videos - same male person (KING), same female person (QUEEN), same faces
- The male person from IMAGE 1 must appear as KING in ALL generated images with the SAME face
- The female person from IMAGE 2 must appear as QUEEN in ALL generated images with the SAME face

LOGO INTEGRATION:
- LOAD the logo image
- REMOVE white background (make transparent)
- PLACE in BOTTOM RIGHT CORNER
- SIZE: 10-15% of image width
- OPACITY: 70-80%

SCENE: King and queen in Dubrovnik, Game of Thrones style, majestic and regal, epic fantasy
LOCATION: Dubrovnik old town, Stradun, medieval architecture in background, Croatian landmarks visible
STYLE: Epic fantasy, cinematic, dramatic lighting, royal atmosphere, medieval aesthetic
COMPOSITION: Both people in royal medieval attire, majestic poses, Dubrovnik landmarks visible, professional photography quality, high resolution, sharp details, balanced composition with both faces clearly visible`,

  'template-03': `Ultra-photorealistic, highly cinematic beach sunset photograph.

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

SCENE: Romantic couple on beach during sunset, warm golden hour lighting, ocean waves
LOCATION: Beautiful beach, ocean waves, sunset sky, romantic beach setting
STYLE: Warm colors, golden hour, romantic atmosphere, natural lighting, cinematic
COMPOSITION: Both people on beach, romantic interaction, sunset in background, professional photography quality, high resolution, sharp details, balanced composition with both faces clearly visible`
};

// Fallback promptovi ako MD ne radi
const fallbackPrompts = {
  'template-01': {
    scene: 'Romantic couple in elegant 1920s style clothing, vintage fashion, art deco aesthetic',
    location: 'Vintage setting, 1920s atmosphere, glamorous environment, period-appropriate background',
    style: 'Black and white or sepia tone, art deco style, timeless elegance, glamorous, sophisticated'
  }
  // Dodaj ostale...
};

function getPrompt(templateId, isCouple) {
  // Koristi hardcoded promptove
  if (prompts[templateId]) {
    let prompt = prompts[templateId];
    
    // Ako je couple, prilagodi prompt
    if (isCouple) {
      prompt = prompt.replace(
        /TWO INPUT IMAGES:[\s\S]*?IMAGE 2: FEMALE FACE/,
        'ONE INPUT IMAGE: COUPLE IMAGE (contains both MALE and FEMALE person together)'
      );
      prompt = prompt.replace(
        /IDENTIFY the male person from IMAGE 1/,
        'IDENTIFY the MALE person from the couple image'
      );
      prompt = prompt.replace(
        /IDENTIFY the female person from IMAGE 2/,
        'IDENTIFY the FEMALE person from the couple image'
      );
      prompt += '\n- EXTRACT both faces from the single couple image and use them as reference models';
    }
    
    // Logo je već u image_input arrayu, ne treba ga spominjati u promptu
    // Samo osiguraj da prompt ne spominje logo URL direktno
    prompt = prompt.replace(
      /ONE LOGO IMAGE \(Love Stories Museum logo\)/,
      'ONE LOGO IMAGE (Love Stories Museum logo - provided in image_input array)'
    );
    
    // Ukloni bilo kakve URL reference na logo iz prompta
    prompt = prompt.replace(/https:\/\/examples\.b-cdn\.net\/logo\.jpg/g, 'the logo image from image_input array');
    
    return prompt;
  }
  
  // Fallback na hardcoded
  const fallback = fallbackPrompts[templateId] || fallbackPrompts['template-01'];
  
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

SCENE: ${fallback.scene}
LOCATION: ${fallback.location}
STYLE: ${fallback.style}

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

SCENE: ${fallback.scene}
LOCATION: ${fallback.location}
STYLE: ${fallback.style}

COMPOSITION:
- Both people should be clearly visible in the scene
- Natural interaction between the couple
- Professional photography quality
- High resolution, sharp details
- Balanced composition with both faces clearly visible`;
  }
}

module.exports = { getPrompt };

