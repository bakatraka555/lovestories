# 🐰 Bunny.net Storage Setup

## 📋 Što Ova Skripta Radi

1. **Kreira strukturu foldera** prema `couples-templates-database.json`
2. **Generira placeholder slike** za sve primjere
3. **Uploada placeholder slike** na Bunny.net Storage
4. **Kreira `temp/` folder** za korisničke uploads

---

## 🚀 Kako Pokrenuti

### 1. Instaliraj Dependencies

```bash
pip install -r requirements.txt
```

### 2. Postavi Environment Variables

```bash
# Windows PowerShell
$env:BUNNY_API_KEY="your-api-key-here"
$env:BUNNY_STORAGE_ZONE="lovestories-examples"

# Windows CMD
set BUNNY_API_KEY=your-api-key-here
set BUNNY_STORAGE_ZONE=lovestories-examples

# Linux/Mac
export BUNNY_API_KEY="your-api-key-here"
export BUNNY_STORAGE_ZONE="lovestories-examples"
```

### 3. Pokreni Skriptu

```bash
python setup-bunny-structure.py
```

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

### 1. Provjeri Placeholder Slike

Otvori u browseru:
```
https://examples.b-cdn.net/template-01/vintage-1920s-1.jpg
```

### 2. Zamijeni Placeholder Slike

Kada generiraš prave primjere:
1. Uploadaj ih na iste putanje u Bunny.net
2. Placeholder slike će se automatski zamijeniti

### 3. Upload Video Fajlove

Video fajlovi se ne generiraju automatski - uploadaj ih ručno:
- `template-01/vintage-1920s-1.mp4`
- `template-02/medieval-romance-1.mp4`
- itd.

---

## 🔧 Troubleshooting

### Error: "BUNNY_API_KEY not set"
- Provjeri da si postavio environment variable
- Na Windows koristi `$env:BUNNY_API_KEY` (PowerShell)

### Error: "401 Unauthorized"
- Provjeri da je API key ispravan
- Provjeri da je Storage Zone ime točno: `lovestories-examples`

### Error: "ModuleNotFoundError: No module named 'PIL'"
- Instaliraj: `pip install Pillow`

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

