# 🎨 Love Stories Museum - Prompt Templates

## 📋 Pregled

Ovaj dokument sadrži sve **13 prompt template-a** za Love Stories Museum Photo Booth.

Svaki prompt podržava:
- **COUPLE IMAGE**: 1 slika s parom (oba lica zajedno)
- **SEPARATE IMAGES**: 2 odvojene slike (muško + žensko lice)
- **LOGO**: Treća slika u `image_input` array (transparent PNG s Bunny CDN-a)

---

## 🔑 Image Input Array Format

### Za COUPLE (1 slika para):
```javascript
image_input: [
  "https://examples.b-cdn.net/temp/couple-image.jpg",  // Slika para
  "https://examples.b-cdn.net/logo.jpg"                 // Logo
]
```

### Za SEPARATE (2 odvojene slike):
```javascript
image_input: [
  "https://examples.b-cdn.net/temp/male-face.jpg",     // Muško lice
  "https://examples.b-cdn.net/temp/female-face.jpg",   // Žensko lice
  "https://examples.b-cdn.net/logo.jpg"                 // Logo
]
```

---

## 🎯 Svih 13 Template-a

### Template 01: Vintage Romance (1920s)
**Kategorija:** Vintage

| Element | Opis |
|---------|------|
| **Scene** | Romantic couple in elegant 1920s style clothing, vintage fashion, art deco aesthetic |
| **Location** | Vintage setting, 1920s atmosphere, glamorous environment, period-appropriate background |
| **Style** | Black and white or sepia tone, art deco style, timeless elegance, glamorous, sophisticated |

---

### Template 02: Medieval Romance (King & Queen)
**Kategorija:** Fantasy

| Element | Opis |
|---------|------|
| **Scene** | King and queen in Dubrovnik, Game of Thrones style, majestic and regal, epic fantasy |
| **Location** | Dubrovnik old town, Stradun, medieval architecture in background, Croatian landmarks visible |
| **Style** | Epic fantasy, cinematic, dramatic lighting, royal atmosphere, medieval aesthetic |
| **Special** | Male person is KING, female person is QUEEN |

---

### Template 03: Beach Sunset
**Kategorija:** Nature

| Element | Opis |
|---------|------|
| **Scene** | Romantic couple on beach during sunset, warm golden hour lighting, ocean waves |
| **Location** | Beautiful beach, ocean waves, sunset sky, romantic beach setting |
| **Style** | Warm colors, golden hour, romantic atmosphere, natural lighting, cinematic |

---

### Template 04: City Lights
**Kategorija:** Modern

| Element | Opis |
|---------|------|
| **Scene** | Couple in city at night with beautiful bokeh lights, glamorous and sophisticated urban atmosphere |
| **Location** | Modern city at night, skyscrapers, neon lights, urban environment with beautiful bokeh effect |
| **Style** | Night photography, bokeh lights, glamorous, sophisticated, urban chic, cinematic |

---

### Template 05: Garden Wedding
**Kategorija:** Wedding

| Element | Opis |
|---------|------|
| **Scene** | Romantic wedding ceremony in beautiful garden setting, flowers everywhere, natural light |
| **Location** | Lush garden with flowers, wedding arch, romantic outdoor setting |
| **Style** | Soft natural lighting, romantic, elegant, wedding photography style, dreamy atmosphere |

---

### Template 06: Casino Glamour
**Kategorija:** Glamour

| Element | Opis |
|---------|------|
| **Scene** | Elegant couple at poker table in luxurious casino, sophisticated and glamorous atmosphere |
| **Location** | Luxurious casino interior, poker table, chips, cards, chandeliers, velvet and gold |
| **Style** | Glamorous, sophisticated, James Bond style, dramatic lighting, high-end luxury |

---

### Template 07: Chibi 3D
**Kategorija:** Cute

| Element | Opis |
|---------|------|
| **Scene** | Cute 3D chibi characters, kawaii style, sweet and romantic, colorful and playful |
| **Location** | Colorful fantasy background, cute environment, hearts and sparkles |
| **Style** | 3D render, chibi proportions, kawaii aesthetic, bright colors, cute and adorable |
| **Special** | Big heads, small bodies, cute expressions |

---

### Template 08: Trading Card Style
**Kategorija:** Fantasy

| Element | Opis |
|---------|------|
| **Scene** | Epic trading card design with couple as fantasy heroes, dynamic composition, dramatic |
| **Location** | Fantasy background with magical elements, epic scenery, dramatic sky |
| **Style** | Trading card game art style, dynamic poses, fantasy elements, dramatic lighting, detailed illustration |
| **Special** | Card border visible, epic and heroic poses |

---

### Template 09: Dubrovnik Sunrise
**Kategorija:** Travel

| Element | Opis |
|---------|------|
| **Scene** | Romantic couple in Dubrovnik at sunrise, St. Vlaho church in background, warm morning light |
| **Location** | Dubrovnik Old Town, St. Vlaho Church, Stradun, ancient stone buildings, Adriatic Sea visible |
| **Style** | Travel photography, warm sunrise colors, golden hour, cinematic, professional quality |

---

### Template 10: Volcano Adventure
**Kategorija:** Adventure

| Element | Opis |
|---------|------|
| **Scene** | 3D big head caricature style, adventure theme with volcano in background, fun and playful |
| **Location** | Volcanic landscape, adventure setting, dramatic volcano with lava, exciting environment |
| **Style** | 3D caricature with exaggerated big heads, fun and playful, adventure movie style, colorful |

---

### Template 11: Instagram Frame
**Kategorija:** Social

| Element | Opis |
|---------|------|
| **Scene** | Social media style photo with Instagram frame aesthetic, finger heart gesture, modern and trendy |
| **Location** | Trendy backdrop, colorful background, social media aesthetic |
| **Style** | Instagram photo style, modern, trendy, colorful, influencer aesthetic, bright and vibrant |
| **Special** | Finger heart gesture, Instagram-worthy poses |

---

### Template 12: Forever Together Box
**Kategorija:** Collectible

| Element | Opis |
|---------|------|
| **Scene** | Couple as 3D collectible figures inside a display box, premium quality figurines |
| **Location** | Inside a collectible display box with "Forever Together" or "Love Stories" branding |
| **Style** | 3D figurine style, collectible toy aesthetic, premium quality, detailed miniature figures |

---

### Template 13: Cinematic Travel
**Kategorija:** Travel

| Element | Opis |
|---------|------|
| **Scene** | Professional travel photography of couple in Dubrovnik, cinematic composition, wanderlust |
| **Location** | Dubrovnik scenic viewpoint, ancient walls, Adriatic Sea, Croatian coast |
| **Style** | Professional travel photography, cinematic, National Geographic style, high quality, dramatic |

---

## 🔧 API Poziv Format

### Replicate API Call:

```javascript
const response = await fetch('https://api.replicate.com/v1/models/google/nano-banana-pro/predictions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    input: {
      prompt: promptText,
      image_input: [
        coupleImageUrl,  // ili [maleImageUrl, femaleImageUrl]
        logoUrl
      ],
      aspect_ratio: 'match_input_image',  // ili '4:3', '9:16', itd.
      output_format: 'jpg',
      resolution: '2K',
      safety_filter_level: 'block_only_high'
    }
  })
});
```

---

## 📝 Logo Integracija

### Logo na Bunny CDN:
```
URL: https://examples.b-cdn.net/logo.jpg
```

### Prompt instrukcije za logo:
```
LOGO INTEGRATION:
- Use the LOGO IMAGE from image_input array
- REMOVE white background from logo (make it transparent)
- PLACE logo in BOTTOM RIGHT CORNER of generated image
- SIZE: 10-15% of image width
- OPACITY: 70-80% (semi-transparent, visible but not distracting)
- Logo should blend naturally into the scene
```

---

## ✅ Checklist za Svaki Template

- [x] Scene opis specifičan za template
- [x] Location opis specifičan za template
- [x] Style opis specifičan za template
- [x] Face recognition instrukcije uključene
- [x] Logo integration instrukcije uključene
- [x] Podrška za COUPLE image (1 slika)
- [x] Podrška za SEPARATE images (2 slike)
- [x] Composition instrukcije uključene

---

## 🔗 Povezani Fajlovi

- `netlify/functions/prompts.js` - Hardcoded promptovi za Netlify Functions
- `netlify/functions/generate-image.js` - Generiranje slika
- `docs/couples-templates-database.json` - Template metadata

---

## 📅 Zadnje Ažuriranje

**Datum:** 2025-11-26
**Verzija:** 2.0 (Svih 13 template-a)
