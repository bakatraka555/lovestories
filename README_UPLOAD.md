# 📤 Upload Fileova na Bunny.net - Vodič

## 📋 Što Trebaš

1. **Bunny.net API Key** (iz Bunny.net dashboarda)
2. **Storage Zone name** (npr. `lovestories-examples`)
3. **Fileove** u `examples/` folderu

---

## 🚀 Kako Koristiti

### Opcija 1: JavaScript (Node.js)

1. **Postavi environment varijable:**
   ```bash
   # Windows PowerShell
   $env:BUNNY_API_KEY="tvoj-api-key"
   $env:BUNNY_STORAGE_ZONE="lovestories-examples"
   
   # Windows CMD
   set BUNNY_API_KEY=tvoj-api-key
   set BUNNY_STORAGE_ZONE=lovestories-examples
   
   # Linux/Mac
   export BUNNY_API_KEY="tvoj-api-key"
   export BUNNY_STORAGE_ZONE="lovestories-examples"
   ```

2. **Pokreni skriptu:**
   ```bash
   node upload-to-bunny.js
   ```

### Opcija 2: Python

1. **Instaliraj requests:**
   ```bash
   pip install requests
   ```

2. **Postavi environment varijable:**
   ```bash
   # Windows PowerShell
   $env:BUNNY_API_KEY="tvoj-api-key"
   $env:BUNNY_STORAGE_ZONE="lovestories-examples"
   
   # Linux/Mac
   export BUNNY_API_KEY="tvoj-api-key"
   export BUNNY_STORAGE_ZONE="lovestories-examples"
   ```

3. **Pokreni skriptu:**
   ```bash
   python upload-to-bunny.py
   ```

---

## 📁 Struktura Foldera

Skripta očekuje fileove u ovom formatu:

```
examples/
├── template-01/
│   ├── vintage-1920s-1.jpg
│   ├── vintage-1920s-2.jpg
│   ├── vintage-1920s-1.mp4
│   └── thumbs/
│       ├── vintage-1920s-1-thumb.jpg
│       └── vintage-1920s-2-thumb.jpg
├── template-02/
│   └── ...
└── ...
```

**Ako nemaš fileove:**
- Skripta će preskočiti nedostajuće fileove
- Uploadat će samo fileove koji postoje

---

## 🔑 Gdje Dobiti API Key?

1. **Bunny.net Dashboard:**
   - Idi na **Account** → **API Keys**
   - Klikni **"Generate API Key"**
   - Kopiraj API Key

2. **Zapiši ga sigurno:**
   - ⚠️ Vidljiv samo jednom!
   - Ne commitaj u Git!

---

## 📝 Što Skripta Radi?

1. **Prođe kroz sve template foldere**
2. **Uploada sve fileove** na Bunny.net Storage
3. **Kreira istu strukturu** kao lokalno
4. **Prikazuje progress** i rezultate

---

## ✅ Nakon Uploada

1. **Provjeri u Bunny.net dashboardu:**
   - Storage → lovestories-examples
   - Trebao bi vidjeti sve fileove

2. **Testiraj CDN URL:**
   ```
   https://lovestories-cdn.b-cdn.net/template-01/vintage-1920s-1.jpg
   ```

3. **Ažuriraj JSON datoteku:**
   - Promijeni URL-ove u `docs/couples-templates-database.json`
   - Koristi CDN URL format

---

## 🆘 Troubleshooting

### Problem: "BUNNY_API_KEY nije postavljen"

**Rješenje:**
- Provjeri da si postavio environment varijablu
- Provjeri da si koristio pravilnu sintaksu za tvoj OS

### Problem: "File ne postoji"

**Rješenje:**
- Provjeri da su fileovi u `examples/` folderu
- Provjeri da struktura foldera odgovara očekivanoj

### Problem: "Upload failed: 401"

**Rješenje:**
- Provjeri da je API Key točan
- Provjeri da imaš dozvole za Storage Zone

---

## 💡 Alternativa: Ručni Upload

Ako ne želiš koristiti skriptu:

1. **Idi na Bunny.net Dashboard**
2. **Storage → lovestories-examples**
3. **Klikni "Upload"**
4. **Uploadaj fileove ručno**

---

## 📞 Support

- **Bunny.net Docs:** https://docs.bunny.net/reference/storage-api
- **Storage API:** https://docs.bunny.net/reference/storage-api-put

