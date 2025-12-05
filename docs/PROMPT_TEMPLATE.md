# 🎨 Prompt Template za nano-banana-pro

## 📋 Osnovna Struktura

nano-banana-pro podržava **2 input slike** (muško i žensko lice) koja će biti konstantna kroz sve generacije.

---

## 🔑 Ključni Elementi Prompta

### 1. Face Recognition & Consistency

```
CRITICAL: FACE CONSISTENCY
- TWO INPUT IMAGES: ONE MALE FACE, ONE FEMALE FACE
- MAINTAIN MAXIMUM FACIAL RECOGNIZABILITY across all generations
- PRESERVE all distinctive facial features from both reference images
- KEEP faces 100% ACCURATE from reference
- DO NOT alter facial structure, bone structure, or distinctive features
- CONSISTENT faces across all images and videos
```

### 2. Logo Integration

```
LOGO INTEGRATION:
- ONE LOGO IMAGE (Love Stories Museum logo)
- make it transparent
- PLACE in BOTTOM RIGHT CORNER
- SIZE: 8% of image width
- OPACITY: transparent
```

### 3. Template-Specific Scene

```
[SCENA OPIS - ovisno o templateu]
[LOKACIJA OPIS]
[STIL OPIS]
```

---

## 📝 Kompletni Prompt Template

### Osnovni Format:

```
Ultra-photorealistic, highly cinematic [STIL] photograph.

CRITICAL: INPUT IMAGE PROCESSING
- TWO INPUT IMAGES:
  * IMAGE 1: MALE FACE (reference model)
  * IMAGE 2: FEMALE FACE (reference model)
- ONE LOGO IMAGE (Love Stories Museum logo)

FACE RECOGNITION & CONSISTENCY:
- LOAD and ANALYZE both input images
- IDENTIFY the male person from IMAGE 1 - recognize all facial features
- IDENTIFY the female person from IMAGE 2 - recognize all facial features
- MAINTAIN MAXIMUM RECOGNIZABILITY for both faces
- PRESERVE all distinctive facial features from both references
- KEEP both faces 100% ACCURATE from their reference images
- DO NOT alter facial structure, bone structure, or distinctive features
- CONSISTENT faces across all generations - same people, same faces

LOGO INTEGRATION:
- LOAD the logo image
- make it transparent
- PLACE in BOTTOM RIGHT CORNER
- SIZE: 8% of image width
- OPACITY: transparent

[SCENA OPIS]
[LOKACIJA OPIS]
[STIL OPIS]

COMPOSITION:
- Both people should be clearly visible
- Natural interaction between the couple
- Professional photography quality
- High resolution, sharp details
```

---

## 🎯 Template-Specific Prompts

### Template 01: Vintage Romance (1920s)

```
Ultra-photorealistic, highly cinematic vintage 1920s photograph.

CRITICAL: INPUT IMAGE PROCESSING
- TWO INPUT IMAGES:
  * IMAGE 1: MALE FACE (reference model)
  * IMAGE 2: FEMALE FACE (reference model)
- ONE LOGO IMAGE (Love Stories Museum logo)

FACE RECOGNITION & CONSISTENCY:
- LOAD and ANALYZE both input images
- IDENTIFY the male person from IMAGE 1 - recognize all facial features
- IDENTIFY the female person from IMAGE 2 - recognize all facial features
- MAINTAIN MAXIMUM RECOGNIZABILITY for both faces
- PRESERVE all distinctive facial features from both references
- KEEP both faces 100% ACCURATE from their reference images
- DO NOT alter facial structure, bone structure, or distinctive features
- CONSISTENT faces across all generations - same people, same faces

LOGO INTEGRATION:
- LOAD the logo image
- make it transparent
- PLACE in BOTTOM RIGHT CORNER
- SIZE: 8% of image width
- OPACITY: transparent

SCENE: Romantic couple in elegant 1920s style clothing, vintage fashion, art deco aesthetic
LOCATION: Vintage setting, 1920s atmosphere, glamorous environment
STYLE: Black and white or sepia tone, art deco style, timeless elegance, glamorous
COMPOSITION: Both people in period-appropriate clothing, natural romantic interaction, professional vintage photography quality, high resolution, sharp details
```

### Template 02: Medieval Romance

```
Ultra-photorealistic, highly cinematic medieval fantasy photograph.

CRITICAL: INPUT IMAGE PROCESSING
- TWO INPUT IMAGES:
  * IMAGE 1: MALE FACE (reference model - will be KING)
  * IMAGE 2: FEMALE FACE (reference model - will be QUEEN)
- ONE LOGO IMAGE (Love Stories Museum logo)

FACE RECOGNITION & CONSISTENCY:
- LOAD and ANALYZE both input images
- IDENTIFY the male person from IMAGE 1 - recognize all facial features (KING)
- IDENTIFY the female person from IMAGE 2 - recognize all facial features (QUEEN)
- MAINTAIN MAXIMUM RECOGNIZABILITY for both faces
- PRESERVE all distinctive facial features from both references
- KEEP both faces 100% ACCURATE from their reference images
- DO NOT alter facial structure, bone structure, or distinctive features
- CONSISTENT faces across all generations - same people, same faces

LOGO INTEGRATION:
- LOAD the logo image
- make it transparent
- PLACE in BOTTOM RIGHT CORNER
- SIZE: 8% of image width
- OPACITY: transparent

SCENE: King and queen in Dubrovnik, Game of Thrones style, majestic and regal
LOCATION: Dubrovnik old town, Stradun, medieval architecture in background
STYLE: Epic fantasy, cinematic, dramatic lighting, royal atmosphere
COMPOSITION: Both people in royal medieval attire, majestic poses, Dubrovnik landmarks visible, professional photography quality, high resolution, sharp details
```

### Template 03: Beach Sunset

```
Ultra-photorealistic, highly cinematic beach sunset photograph.

CRITICAL: INPUT IMAGE PROCESSING
- TWO INPUT IMAGES:
  * IMAGE 1: MALE FACE (reference model)
  * IMAGE 2: FEMALE FACE (reference model)
- ONE LOGO IMAGE (Love Stories Museum logo)

FACE RECOGNITION & CONSISTENCY:
- LOAD and ANALYZE both input images
- IDENTIFY the male person from IMAGE 1 - recognize all facial features
- IDENTIFY the female person from IMAGE 2 - recognize all facial features
- MAINTAIN MAXIMUM RECOGNIZABILITY for both faces
- PRESERVE all distinctive facial features from both references
- KEEP both faces 100% ACCURATE from their reference images
- DO NOT alter facial structure, bone structure, or distinctive features
- CONSISTENT faces across all generations - same people, same faces

LOGO INTEGRATION:
- LOAD the logo image
- make it transparent
- PLACE in BOTTOM RIGHT CORNER
- SIZE: 8% of image width
- OPACITY: transparent

SCENE: Romantic couple on beach during sunset, warm golden hour lighting
LOCATION: Beautiful beach, ocean waves, sunset sky
STYLE: Warm colors, golden hour, romantic atmosphere, natural lighting
COMPOSITION: Both people on beach, romantic interaction, sunset in background, professional photography quality, high resolution, sharp details
```

---

## 🔧 API Poziv Format

### Za nano-banana-pro:

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
      image: maleFaceImage,  // Prva slika - muško lice
      image2: femaleFaceImage, // Druga slika - žensko lice
      logo: logoImage, // Logo slika
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

## 📋 Checklist za Svaki Template

- [ ] Prompt uključuje face recognition instrukcije
- [ ] Spomenuta su oba input image-a (male i female)
- [ ] Logo integracija je opisana
- [ ] Scene, location i style su specifični za template
- [ ] Composition instrukcije su jasne
- [ ] Consistency naglašena kroz prompt

---

## 💡 Savjeti

1. **Koristi iste reference slike** za sve generacije - to osigurava konzistentnost
2. **Jasno naglasi face consistency** u promptu
3. **Testiraj s 1-2 templatea** prije batch generiranja
4. **Provjeri logo integraciju** - logo mora biti transparentan PNG

---

## 🔗 Korisni Linkovi

- nano-banana-pro: https://replicate.com/google/nano-banana-pro
- Replicate API Docs: https://replicate.com/docs

