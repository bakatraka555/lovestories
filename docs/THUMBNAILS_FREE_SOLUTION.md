# 🖼️ Besplatno Rješenje za Thumbnails

## ✅ Implementirano: Netlify Function + Sharp (BESPLATNO)

Umjesto plaćenog Bunny Optimizer, koristimo **Netlify Function s `sharp` bibliotekom** koja automatski generira thumbnails.

---

## 🔧 Kako Funkcionira?

### 1. **Pri Uploadu Generirane Slike** (Automatski)

Kada korisnik generira novu sliku:

1. `upload-to-bunny.js` downloada sliku s Replicate URL-a
2. Uploada glavnu sliku na Bunny.net (`template-01/user-xxx.jpg`)
3. **Automatski generira thumbnail** (200x200) koristeći `sharp` biblioteku
4. Uploada thumbnail na Bunny.net (`template-01/thumbs/user-xxx-thumb.jpg`)
5. Vraća oba URL-a (glavna slika + thumbnail)

**Lokacija:** `netlify/functions/upload-to-bunny.js`

```javascript
// Automatski generira thumbnail nakon uploada glavne slike
const thumbnailBuffer = await sharp(imageBuffer)
  .resize(200, 200, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 85 })
  .toBuffer();
```

---

### 2. **Za Example Slike** (Ručno ili Automatski)

Za example slike koje se nalaze u `couples-templates-database.json`:

**Opcija A: Ručno Upload Thumbnails** (Preporučeno)
- Uploadaj thumbnail fajlove ručno u `thumbs/` foldere
- Format: `template-01/thumbs/vintage-1920s-1-thumb.jpg`

**Opcija B: Automatski Generiraj Thumbnail URL** (Fallback)
- Frontend automatski generira thumbnail URL iz glavne slike
- Format: `template-01/vintage-1920s-1.jpg` → `template-01/thumbs/vintage-1920s-1-thumb.jpg`
- Ako thumbnail ne postoji, koristi glavnu sliku (CSS resize)

**Lokacija:** `museum-kiosk.html` (ažurirano)

---

## 📦 Dependencies

### Netlify Function (`upload-to-bunny.js`)

```json
{
  "dependencies": {
    "sharp": "^0.33.0"  // Besplatna biblioteka za generiranje thumbnails
  }
}
```

**Instalacija:**
```bash
npm install sharp
```

---

## ✅ Prednosti (Besplatno Rješenje)

1. **Potpuno besplatno** - Nema dodatnih troškova
2. **Automatsko generiranje** - Nema potrebe za ručnim uploadom thumbnails za generirane slike
3. **Manji bandwidth** - Thumbnails su 200x200 (brže učitavanje galerije)
4. **Fallback mehanizam** - Ako thumbnail ne postoji, koristi se glavna slika
5. **CSS resize** - Glavne slike se automatski resize-uju ako thumbnail ne postoji

---

## 🔄 Workflow

### Upload Flow (Generirane Slike)

```
1. Korisnik uploada sliku → generate-image.js
2. Replicate generira sliku → vraća URL
3. upload-to-bunny.js:
   ├─ Downloada sliku s Replicate
   ├─ Uploada glavnu sliku → template-01/user-xxx.jpg
   ├─ Generira thumbnail (sharp) → 200x200
   └─ Uploada thumbnail → template-01/thumbs/user-xxx-thumb.jpg
4. Vraća oba URL-a frontendu
```

### Frontend Display (Example Slike)

```
1. Čita template.examples.image[].thumbnail
2. Ako thumbnail postoji → koristi thumbnail
3. Ako thumbnail ne postoji:
   ├─ Generira thumbnail URL automatski
   ├─ Pokuša učitati generirani thumbnail
   └─ Ako ne postoji → koristi glavnu sliku (CSS resize)
```

---

## 📝 Napomene

- **Thumbnails za generirane slike** se automatski generiraju pri uploadu (besplatno)
- **Thumbnails za example slike** se mogu uploadati ručno ili koristiti CSS resize
- **Sharp biblioteka** se koristi samo u Netlify Functions (server-side)
- **CSS resize** se koristi na frontendu kao fallback
- **Nema potrebe za Bunny Optimizer** - sve je besplatno!

---

## 🔗 Povezani Fajlovi

- `netlify/functions/upload-to-bunny.js` - Automatsko generiranje thumbnails (besplatno)
- `museum-kiosk.html` - Frontend display s automatskim thumbnail URL-om
- `package.json` - Sharp dependency (besplatna biblioteka)
- `docs/BUNNY_UPLOAD_CHECKLIST.md` - Ručni upload checklist

---

## 🎯 Rezultat

- ✅ **Potpuno besplatno** - Nema dodatnih troškova
- ✅ **Automatsko generiranje** - Thumbnails se generiraju pri uploadu
- ✅ **Nema potrebe za Bunny Optimizer** - Sharp biblioteka je besplatna
- ✅ **Manji bandwidth** - Thumbnails su 200x200


