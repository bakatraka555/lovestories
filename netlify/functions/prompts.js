/**
 * Prompt templates za Love Stories Museum Photo Booth
 * 
 * Svi 13 template-a s podrškom za:
 * - COUPLE IMAGE: 1 slika s oba lica (par zajedno)
 * - SEPARATE IMAGES: 2 odvojene slike (muško + žensko lice)
 * - LOGO: Treća slika u image_input array (transparent PNG s Bunny CDN-a)
 */

// ============================================================================
// TEMPLATE SCENE DEFINITIONS
// Svaki template ima: scene, location, style, specialInstructions
// ============================================================================

const templateScenes = {
  'template-01': {
    name: 'Vintage Romance (1920s)',
    scene: 'Romantic couple in elegant 1920s style clothing, vintage fashion, art deco aesthetic',
    location: 'Vintage setting, 1920s atmosphere, glamorous environment, period-appropriate background',
    style: 'Black and white or sepia tone, art deco style, timeless elegance, glamorous, sophisticated',
    specialInstructions: 'Both people in period-appropriate clothing, natural romantic interaction'
  },
  'template-02': {
    name: 'Medieval Romance (King & Queen)',
    scene: 'King and queen in Dubrovnik, Game of Thrones style, majestic and regal, epic fantasy',
    location: 'Dubrovnik old town, Stradun, medieval architecture in background, Croatian landmarks visible',
    style: 'Epic fantasy, cinematic, dramatic lighting, royal atmosphere, medieval aesthetic',
    specialInstructions: 'Both people in royal medieval attire, majestic poses, Dubrovnik landmarks visible, male person is KING, female person is QUEEN'
  },
  'template-03': {
    name: 'Beach Sunset',
    scene: 'Romantic couple on beach during sunset, warm golden hour lighting, ocean waves',
    location: 'Beautiful beach, ocean waves, sunset sky, romantic beach setting',
    style: 'Warm colors, golden hour, romantic atmosphere, natural lighting, cinematic',
    specialInstructions: 'Both people on beach, romantic interaction, sunset in background'
  },
  'template-04': {
    name: 'City Lights',
    scene: 'Couple in city at night with beautiful bokeh lights, glamorous and sophisticated urban atmosphere',
    location: 'Modern city at night, skyscrapers, neon lights, urban environment with beautiful bokeh effect',
    style: 'Night photography, bokeh lights, glamorous, sophisticated, urban chic, cinematic',
    specialInstructions: 'Both people elegantly dressed, city lights creating romantic bokeh background'
  },
  'template-05': {
    name: 'Garden Wedding',
    scene: 'Romantic wedding ceremony in beautiful garden setting, flowers everywhere, natural light',
    location: 'Lush garden with flowers, wedding arch, romantic outdoor setting',
    style: 'Soft natural lighting, romantic, elegant, wedding photography style, dreamy atmosphere',
    specialInstructions: 'Both people in wedding attire, surrounded by flowers, romantic and elegant'
  },
  'template-06': {
    name: 'Love Walks Through Time',
    scene: 'Romantic couple walking together in the rain under one umbrella, man in classic black suit holding umbrella, woman in elegant blue skirt holding his arm, soft smiles and gentle eye contact',
    location: 'Ancient cobblestone street with vintage European architecture, warm glowing street lamps, wet reflections on pavement, light mist in distance, glistening puddles, old stone buildings',
    style: 'Cinematic romantic editorial, moody golden-hour lamplight mixed with cool rain tones, rich contrast between dark suit and blue skirt against warm amber streetlights, rain-speckled atmosphere with soft bokeh lights and glossy reflections on wet cobblestones',
    specialInstructions: 'Walking close together under one umbrella, man slightly ahead holding umbrella, woman beside him holding his arm looking affectionately toward him, clothes slightly damp from rain for realism, raindrops caught in light, timeless romantic nostalgic mood'
  },
  'template-07': {
    name: 'Chibi 3D',
    scene: 'Cute 3D chibi characters, kawaii style, sweet and romantic, colorful and playful',
    location: 'Colorful fantasy background, cute environment, hearts and sparkles',
    style: '3D render, chibi proportions, kawaii aesthetic, bright colors, cute and adorable',
    specialInstructions: 'Both people as chibi characters with big heads and small bodies, cute expressions, holding hands or hugging'
  },
  'template-08': {
    name: 'Trading Card Style',
    scene: 'Epic trading card design with couple as fantasy heroes, dynamic composition, dramatic',
    location: 'Fantasy background with magical elements, epic scenery, dramatic sky',
    style: 'Trading card game art style, dynamic poses, fantasy elements, dramatic lighting, detailed illustration',
    specialInstructions: 'Both people as fantasy characters on a trading card, card border visible, epic and heroic poses'
  },
  'template-09': {
    name: 'Dubrovnik Sunrise',
    scene: 'Romantic couple in Dubrovnik at sunrise, St. Vlaho church in background, warm morning light',
    location: 'Dubrovnik Old Town, St. Vlaho Church, Stradun, ancient stone buildings, Adriatic Sea visible',
    style: 'Travel photography, warm sunrise colors, golden hour, cinematic, professional quality',
    specialInstructions: 'Both people enjoying Dubrovnik sunrise, Croatian landmarks visible, romantic travel moment'
  },
  'template-10': {
    name: 'Volcano Adventure',
    scene: '3D big head caricature style, adventure theme with volcano in background, fun and playful',
    location: 'Volcanic landscape, adventure setting, dramatic volcano with lava, exciting environment',
    style: '3D caricature with exaggerated big heads, fun and playful, adventure movie style, colorful',
    specialInstructions: 'Both people as 3D caricatures with big heads, adventure outfits, exciting poses near volcano'
  },
  'template-11': {
    name: 'Instagram Frame',
    scene: 'Social media style photo with Instagram frame aesthetic, finger heart gesture, modern and trendy',
    location: 'Trendy backdrop, colorful background, social media aesthetic',
    style: 'Instagram photo style, modern, trendy, colorful, influencer aesthetic, bright and vibrant',
    specialInstructions: 'Both people making finger heart gesture, Instagram-worthy poses, modern and cute'
  },
  'template-12': {
    name: 'Forever Together Box',
    scene: 'Couple as 3D collectible figures inside a display box, premium quality figurines',
    location: 'Inside a collectible display box with "Forever Together" or "Love Stories" branding',
    style: '3D figurine style, collectible toy aesthetic, premium quality, detailed miniature figures',
    specialInstructions: 'Both people as detailed 3D figurines inside a toy/collectible box, cute poses, romantic theme'
  },
  'template-13': {
    name: 'Cinematic Travel',
    scene: 'Professional travel photography of couple in Dubrovnik, cinematic composition, wanderlust',
    location: 'Dubrovnik scenic viewpoint, ancient walls, Adriatic Sea, Croatian coast',
    style: 'Professional travel photography, cinematic, National Geographic style, high quality, dramatic',
    specialInstructions: 'Both people in casual travel outfits, exploring Dubrovnik, candid travel photography style'
  }
};

// ============================================================================
// PROMPT GENERATOR FUNCTION
// Generira prompt za bilo koji template, s podrškom za couple ili separate images
// ============================================================================

function generatePrompt(templateId, isCouple) {
  const template = templateScenes[templateId];
  
  if (!template) {
    console.warn(`Template ${templateId} not found, using template-01 as fallback`);
    return generatePrompt('template-01', isCouple);
  }

  // Bazni prompt header
  const baseHeader = `Ultra-photorealistic, highly cinematic ${template.name} photograph.`;

  // Input image processing section - razlikuje couple vs separate
  let inputProcessing;
  
  if (isCouple) {
    inputProcessing = `CRITICAL: INPUT IMAGE PROCESSING
- image_input array contains: [COUPLE_IMAGE, LOGO_IMAGE]
- COUPLE IMAGE: One photo containing BOTH the MALE and FEMALE person together
- LOGO IMAGE: Love Stories Museum logo (transparent PNG)
- EXTRACT and IDENTIFY both faces from the single couple image
- Use the couple image to recognize both people's facial features`;
  } else {
    inputProcessing = `CRITICAL: INPUT IMAGE PROCESSING
- image_input array contains: [MALE_FACE_IMAGE, FEMALE_FACE_IMAGE, LOGO_IMAGE]
- IMAGE 1: MALE FACE (reference model - use this exact face for the male person)
- IMAGE 2: FEMALE FACE (reference model - use this exact face for the female person)
- LOGO IMAGE: Love Stories Museum logo (transparent PNG)`;
  }

  // Face recognition section - isti za oba slučaja
  const faceRecognition = `FACE RECOGNITION & CONSISTENCY:
- LOAD and ANALYZE the input face image(s)
- IDENTIFY the MALE person - recognize ALL facial features: bone structure, eye shape, nose shape, mouth shape, jawline, distinctive characteristics
- IDENTIFY the FEMALE person - recognize ALL facial features: bone structure, eye shape, nose shape, mouth shape, jawline, distinctive characteristics
- MAINTAIN MAXIMUM RECOGNIZABILITY for both faces - they must be clearly recognizable as the same people from input images
- PRESERVE all distinctive facial features from reference images
- KEEP both faces 100% ACCURATE from their reference images
- DO NOT alter facial structure, bone structure, eye shape, nose shape, mouth shape, or any distinctive features
- CONSISTENT faces - same male person, same female person throughout the entire generated image
- Both people must be CLEARLY RECOGNIZABLE as the people from the input image(s)${isCouple ? '\n- EXTRACT both faces from the single couple image and use them as reference models' : ''}`;

  // Logo integration section
  const logoIntegration = `LOGO INTEGRATION:
- Use the LOGO IMAGE from image_input array
- REMOVE white background from logo (make it transparent)
- PLACE logo in BOTTOM RIGHT CORNER of generated image
- SIZE: 10-15% of image width
- OPACITY: 70-80% (semi-transparent, visible but not distracting)
- Logo should blend naturally into the scene`;

  // Scene specific section
  const sceneSection = `SCENE: ${template.scene}
LOCATION: ${template.location}
STYLE: ${template.style}`;

  // Composition section
  const composition = `COMPOSITION:
- Both people should be clearly visible in the scene
- ${template.specialInstructions}
- Natural interaction between the couple
- Professional photography quality
- High resolution, sharp details
- Balanced composition with both faces clearly visible
- Romantic and emotional connection between the couple`;

  // Kombinira sve sekcije
  return `${baseHeader}

${inputProcessing}

${faceRecognition}

${logoIntegration}

${sceneSection}

${composition}`;
}

// ============================================================================
// MAIN EXPORT FUNCTION
// ============================================================================

function getPrompt(templateId, isCouple) {
  return generatePrompt(templateId, isCouple);
}

// Export za Netlify Functions
module.exports = { getPrompt, templateScenes };
