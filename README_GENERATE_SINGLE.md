# 🎨 Generiranje Jedne Scene - Vodič

## 📋 Što Trebaš

1. **Replicate API Token** (iz Replicate dashboarda)
2. **Bunny.net API Key** (iz Bunny.net dashboarda)
3. **Storage Zone name** (npr. `lovestories-examples`)
4. **Reference slike:**
   - `male-face.jpg` - muško lice
   - `female-face.jpg` - žensko lice

---

## 🚀 Kako Koristiti

### 1. Postavi Environment Varijable

```bash
# Windows PowerShell
$env:REPLICATE_API_TOKEN="tvoj-replicate-token"
$env:BUNNY_API_KEY="tvoj-bunny-api-key"
$env:BUNNY_STORAGE_ZONE="lovestories-examples"

# Windows CMD
set REPLICATE_API_TOKEN=tvoj-replicate-token
set BUNNY_API_KEY=tvoj-bunny-api-key
set BUNNY_STORAGE_ZONE=lovestories-examples

# Linux/Mac
export REPLICATE_API_TOKEN="tvoj-replicate-token"
export BUNNY_API_KEY="tvoj-bunny-api-key"
export BUNNY_STORAGE_ZONE="lovestories-examples"
```

### 2. Pripremi Reference Slike

Stavi u root folder:
- `male-face.jpg` - muško lice (reference model)
- `female-face.jpg` - žensko lice (reference model)

### 3. Instaliraj Dependencies

```bash
pip install replicate requests
```

### 4. Pokreni Skriptu

```bash
python generate-and-upload-single.py template-01
```

**Dostupni templatei:**
- `template-01` - Vintage Romance (1920s)
- `template-02` - Medieval Romance
- `template-03` - Beach Sunset
- itd.

---

## 📝 Što Skripta Radi

1. **Downloada logo** s `https://examples.b-cdn.net/logo.jpg`
2. **Generira sliku** na Replicate koristeći:
   - Muško lice (male-face.jpg)
   - Žensko lice (female-face.jpg)
   - Logo s CDN-a
   - Template-specific prompt
3. **Downloada generiranu sliku** lokalno
4. **Uploada na Bunny.net** Storage
5. **Daje ti CDN URL** za korištenje

---

## ✅ Rezultat

Nakon pokretanja, dobit ćeš:

```
✅ GOTOVO!
📸 Lokalna slika: generated_template-01.jpg
🌐 CDN URL: https://lovestories-cdn.b-cdn.net/template-01/generated-image.jpg
📋 Template: Vintage Romance (1920s)
```

---

## 🔧 Troubleshooting

### Problem: "REPLICATE_API_TOKEN nije postavljen"

**Rješenje:**
- Provjeri da si postavio environment varijablu
- Provjeri sintaksu za tvoj OS

### Problem: "Muško lice ne postoji"

**Rješenje:**
- Provjeri da je `male-face.jpg` u root folderu
- Provjeri da je file ime točno (case-sensitive)

### Problem: "Template ne postoji"

**Rješenje:**
- Provjeri da si koristio točan template ID (npr. `template-01`)
- Provjeri dostupne templatee u `docs/couples-templates-database.json`

---

## 💰 Troškovi

- **Generiranje slike:** ~$0.14 (nano-banana-pro)
- **Upload na Bunny.net:** Besplatno (uključeno u plan)

---

## 🔗 Korisni Linkovi

- Replicate API: https://replicate.com/docs
- Bunny.net Storage API: https://docs.bunny.net/reference/storage-api

