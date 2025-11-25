# 🎨 nano-banana-pro Prompt - Dva Modela (Muško + Žensko Lice)

## 📋 Osnovna Struktura

nano-banana-pro podržava **2 input slike** (muško i žensko lice) koja će biti **konstantna kroz sve generacije**.

---

## 🔑 Ključni Prompt Elementi

### Osnovni Format:

```
Ultra-photorealistic, highly cinematic [STIL] photograph.

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

[SCENA OPIS - specifično za template]
[LOKACIJA OPIS]
[STIL OPIS]

COMPOSITION:
- Both people should be clearly visible in the scene
- Natural interaction between the couple
- Professional photography quality
- High resolution, sharp details
- Balanced composition with both faces clearly visible
```

---

## 🎯 Template-Specific Prompts

### Template 01: Vintage Romance (1920s)

```
Ultra-photorealistic, highly cinematic vintage 1920s photograph.

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
COMPOSITION: Both people in period-appropriate clothing, natural romantic interaction, professional vintage photography quality, high resolution, sharp details, balanced composition with both faces clearly visible
```

### Template 02: Medieval Romance

```
Ultra-photorealistic, highly cinematic medieval fantasy photograph.

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
COMPOSITION: Both people in royal medieval attire, majestic poses, Dubrovnik landmarks visible, professional photography quality, high resolution, sharp details, balanced composition with both faces clearly visible
```

### Template 03: Beach Sunset

```
Ultra-photorealistic, highly cinematic beach sunset photograph.

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
COMPOSITION: Both people on beach, romantic interaction, sunset in background, professional photography quality, high resolution, sharp details, balanced composition with both faces clearly visible
```

---

## 🔧 API Poziv Format

### Za nano-banana-pro s 2 input slike:

```javascript
const response = await fetch('https://api.replicate.com/v1/models/google/nano-banana-pro/predictions', {
  method: 'POST',
  headers: {
    'Authorization': `Token ${REPLICATE_API_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    input: {
      prompt: "Tvoj prompt ovdje...",
      image: maleFaceImage,      // Prva slika - muško lice (IMAGE 1)
      image2: femaleFaceImage,   // Druga slika - žensko lice (IMAGE 2)
      logo: logoImage,           // Logo slika
      logo_position: "bottom-right",
      logo_size: 0.12,
      logo_opacity: 0.75,
      num_outputs: 1,
      guidance_scale: 7.5,
      num_inference_steps: 50
    }
  })
});
```

---

## 📝 Važne Napomene

### Face Consistency:

1. **Koristi iste reference slike** za sve generacije
   - Muško lice: uvijek ista slika (IMAGE 1)
   - Žensko lice: uvijek ista slika (IMAGE 2)

2. **Jasno naglasi u promptu:**
   - "The male person from IMAGE 1 must appear in ALL generated images with the SAME face"
   - "The female person from IMAGE 2 must appear in ALL generated images with the SAME face"

3. **Testiraj s 1-2 templatea** prije batch generiranja
   - Provjeri da su lica konzistentna
   - Provjeri da se ne mijenjaju kroz različite generacije

### Logo:

- Logo mora biti **transparentan PNG**
- Provjeri da je white background uklonjen
- Testiraj logo integraciju prije batch generiranja

---

## ✅ Checklist za Svaki Template

- [ ] Prompt uključuje "TWO INPUT IMAGES" instrukcije
- [ ] Spomenuta su oba input image-a (IMAGE 1 = male, IMAGE 2 = female)
- [ ] Face consistency je naglašena kroz prompt
- [ ] Logo integracija je opisana
- [ ] Scene, location i style su specifični za template
- [ ] Composition instrukcije su jasne
- [ ] "SAME face" instrukcije su uključene

---

## 🔗 Korisni Linkovi

- nano-banana-pro: https://replicate.com/google/nano-banana-pro
- Replicate API Docs: https://replicate.com/docs

