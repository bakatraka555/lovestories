# 🐰 Bunny.net Storage Setup

## 📋 Što Ova Funkcija Radi

1. **Kreira strukturu foldera** prema `couples-templates-database.json`
2. **Kreira `temp/` folder** za korisničke uploads
3. **Kreira template foldere** (`template-01/`, `template-02/`, itd.)
4. **Kreira thumbs foldere** (`template-01/thumbs/`, itd.)

**Napomena:** Placeholder slike se ne generiraju automatski - uploadaj ih ručno preko Bunny.net dashboarda.

---

## 🚀 Kako Pokrenuti (Netlify Function)

### Opcija 1: Preko Browsera

1. Otvori: `https://lovestories-dubrovnik.netlify.app/.netlify/functions/create-bunny-folders`
2. Ili pozovi POST request:
   ```bash
   curl -X POST https://lovestories-dubrovnik.netlify.app/.netlify/functions/create-bunny-folders
   ```

### Opcija 2: Preko Netlify Functions Logs

1. Idi na: https://app.netlify.com/sites/YOUR_SITE/functions
2. Pronađi `create-bunny-folders`
3. Klikni "Invoke function"

### Opcija 3: Lokalno (ako imaš Netlify CLI)

```bash
netlify functions:invoke create-bunny-folders
```

**Environment variables** se automatski učitavaju iz Netlify settings (već su postavljene).

---

## 📁 Struktura Foldera

Nakon pokretanja, struktura će biti:

```
lovestories-examples/
├── temp/                          # Korisnički uploads
│   └── .placeholder
├── template-01/
│   ├── vintage-1920s-1.jpg       # Placeholder slika
│   ├── vintage-1920s-2.jpg       # Placeholder slika
│   ├── vintage-1920s-1.mp4       # (uploadaj ručno)
│   └── thumbs/
│       ├── vintage-1920s-1-thumb.jpg
│       ├── vintage-1920s-2-thumb.jpg
│       └── vintage-1920s-1-video-thumb.jpg
├── template-02/
│   ├── medieval-romance-1.jpg
│   ├── medieval-romance-1.mp4
│   └── thumbs/
│       └── ...
├── template-03/
│   └── ...
...
└── template-13/
    └── ...
```

---

## 🖼️ Placeholder Slike

Placeholder slike su:
- **Format:** JPEG
- **Rezolucija:** 1200x900 (4:3 aspect ratio)
- **Thumbnails:** 200x200 (auto-generated)
- **Boja:** Purple gradient (#667eea)
- **Tekst:** Template name + description

---

## ✅ Nakon Pokretanja

### 1. Provjeri da su Folderi Kreirani

Otvori Bunny.net Dashboard:
- https://bunny.net/storage
- Odaberi Storage Zone: `lovestories-examples`
- Provjeri da postoje folderi: `temp/`, `template-01/`, `template-02/`, itd.

### 2. Upload Placeholder Slike Ručno

1. Idi na Bunny.net Storage Dashboard
2. Za svaki template folder (`template-01/`, `template-02/`, itd.):
   - Upload placeholder slike prema `couples-templates-database.json`
   - Format: JPEG, 1200x900 (4:3 aspect ratio)
   - Ime fajla: npr. `vintage-1920s-1.jpg`

3. Za thumbs foldere (`template-01/thumbs/`, itd.):
   - Upload thumbnail slike
   - Format: JPEG, 200x200
   - Ime fajla: npr. `vintage-1920s-1-thumb.jpg`

### 3. Zamijeni Placeholder Slike Pravim Primjerima

Kada generiraš prave primjere:
1. Uploadaj ih na iste putanje u Bunny.net
2. Placeholder slike će se automatski zamijeniti

### 4. Upload Video Fajlove

Video fajlovi se ne generiraju automatski - uploadaj ih ručno:
- `template-01/vintage-1920s-1.mp4`
- `template-02/medieval-romance-1.mp4`
- itd.

---

## 🔧 Troubleshooting

### Error: "BUNNY_API_KEY not configured"
- Provjeri Netlify environment variables:
  - https://app.netlify.com/sites/YOUR_SITE/settings/deploys#environment-variables
- Provjeri da postoji `BUNNY_API_KEY` i `BUNNY_STORAGE_ZONE`

### Error: "401 Unauthorized"
- Provjeri da je API key ispravan u Netlify settings
- Provjeri da je Storage Zone ime točno: `lovestories-examples`
- API key je "Password" (Access Key) iz Bunny.net Storage Zone settings

### Error: "Method not allowed"
- Funkcija prima samo POST requests
- Koristi: `curl -X POST https://YOUR_SITE.netlify.app/.netlify/functions/create-bunny-folders`

---

## 📝 Napomene

- **Placeholder slike** su privremene - zamijeni ih pravim primjerima
- **Video fajlovi** se ne generiraju - uploadaj ih ručno
- **temp/** folder se koristi za korisničke uploads (automatski)
- **CDN URL:** `https://examples.b-cdn.net/` (ne `bunny.net/examples/`)

---

## 🔗 Korisni Linkovi

- Bunny.net Dashboard: https://bunny.net/dashboard
- Storage Zone: https://bunny.net/storage
- CDN Settings: https://bunny.net/cdn

