# 🖼️ Automatsko Generiranje Thumbnails

## 📋 Kada se Thumbnails Generiraju?

### 1. **Pri Uploadu Generirane Slike** ✅ (Automatski)

Kada korisnik generira novu sliku preko aplikacije:

1. **Replicate generira sliku** → vraća URL
2. **`upload-to-bunny.js`** downloada sliku s Replicate URL-a
3. **Uploada glavnu sliku** na Bunny.net (`template-01/user-xxx.jpg`)
4. **Automatski generira thumbnail** (200x200) koristeći `sharp` biblioteku
5. **Uploada thumbnail** na Bunny.net (`template-01/thumbs/user-xxx-thumb.jpg`)
6. **Vraća oba URL-a** (glavna slika + thumbnail)

**Lokacija:** `netlify/functions/upload-to-bunny.js`

```javascript
// Automatski generira thumbnail nakon uploada glavne slike
const thumbnailBuffer = await sharp(imageBuffer)
  .resize(200, 200, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 85 })
  .toBuffer();
```

---

### 2. **Za Example Slike** (Ručno ili CSS Resize)

Za example slike koje se nalaze u `couples-templates-database.json`:

**Opcija A: Ručno Upload Thumbnails** (Trenutno)
- Uploadaj thumbnail fajlove ručno u `thumbs/` foldere
- Format: `template-01/thumbs/vintage-1920s-1-thumb.jpg`

**Opcija B: CSS Automatski Resize** (Fallback)
- Ako thumbnail ne postoji, koristi se glavna slika
- CSS automatski resize-uje na 200px visine (`object-fit: cover`)
- **Lokacija:** `museum-kiosk.html` linija 160-164

```css
.example-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;  /* Automatski resize */
}
```

**Opcija C: Automatski Generiraj Thumbnail URL** (Novo)
- Frontend automatski generira thumbnail URL iz glavne slike
- Format: `template-01/vintage-1920s-1.jpg` → `template-01/thumbs/vintage-1920s-1-thumb.jpg`
- Ako thumbnail ne postoji, koristi glavnu sliku (CSS resize)
- **Lokacija:** `museum-kiosk.html` linija 441-456

---

## 🔧 Kako Funkcionira?

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

## 📦 Dependencies

### Netlify Function (`upload-to-bunny.js`)

```json
{
  "dependencies": {
    "sharp": "^0.33.0"  // Za generiranje thumbnails
  }
}
```

**Instalacija:**
```bash
npm install sharp
```

---

## ✅ Prednosti

1. **Automatsko generiranje** - Nema potrebe za ručnim uploadom thumbnails za generirane slike
2. **Manji bandwidth** - Thumbnails su 200x200 (brže učitavanje galerije)
3. **Fallback mehanizam** - Ako thumbnail ne postoji, koristi se glavna slika
4. **CSS resize** - Glavne slike se automatski resize-uju ako thumbnail ne postoji

---

## 🔄 Migracija

### Za Postojeće Example Slike

**Opcija 1: Ručno Upload Thumbnails** (Preporučeno)
- Uploadaj thumbnail fajlove u `thumbs/` foldere
- Format: `template-01/thumbs/vintage-1920s-1-thumb.jpg`

**Opcija 2: Koristi CSS Resize** (Trenutno)
- Ne trebaš uploadati thumbnails
- CSS automatski resize-uje glavne slike na 200px

**Opcija 3: Generiraj Thumbnails Lokalno**
```bash
# Koristi create-local-structure.py
python create-local-structure.py
# Zatim uploadaj cijelu strukturu na Bunny.net
```

---

## 📝 Napomene

- **Thumbnails za generirane slike** se automatski generiraju pri uploadu
- **Thumbnails za example slike** se mogu uploadati ručno ili koristiti CSS resize
- **Sharp biblioteka** se koristi samo u Netlify Functions (server-side)
- **CSS resize** se koristi na frontendu kao fallback

---

## 🔗 Povezani Fajlovi

- `netlify/functions/upload-to-bunny.js` - Automatsko generiranje thumbnails
- `museum-kiosk.html` - Frontend display s automatskim thumbnail URL-om
- `package.json` - Sharp dependency
- `docs/BUNNY_UPLOAD_CHECKLIST.md` - Ručni upload checklist

