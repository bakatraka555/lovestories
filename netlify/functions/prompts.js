/**
 * Prompt templates iz NANO_BANANA_PROMPT.md
 * Parsira se iz markdown filea
 */

const fs = require('fs');
const path = require('path');

// Učitaj promptove iz MD filea
function loadPromptsFromMD() {
  try {
    const mdPath = path.join(__dirname, '../../docs/NANO_BANANA_PROMPT.md');
    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    
    // Parsiraj sve templatee - traži sve ### Template XX: pattern
    const prompts = {};
    const templateRegex = /### Template (\d+): ([^\n]+)\s+```([\s\S]*?)```/g;
    let match;
    
    while ((match = templateRegex.exec(mdContent)) !== null) {
      const templateNum = match[1].padStart(2, '0');
      const templateId = `template-${templateNum}`;
      const promptText = match[3].trim();
      prompts[templateId] = promptText;
      console.log(`Loaded prompt for ${templateId}`);
    }
    
    return prompts;
  } catch (error) {
    console.error('Error loading prompts from MD:', error);
    return {};
  }
}

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
  const prompts = loadPromptsFromMD();
  
  // Ako ima prompt u MD fileu, koristi ga
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
    
    // Dodaj logo URL
    prompt = prompt.replace(
      /ONE LOGO IMAGE \(Love Stories Museum logo\)/,
      'ONE LOGO IMAGE: https://examples.b-cdn.net/logo.jpg'
    );
    
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

