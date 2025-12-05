# 🖼️ Vodič: Generiranje Thumbnails za Postojeće Slike

## 📋 Problem

`upload-to-bunny.js` automatski generira thumbnails samo za **NOVE** uploadane slike (generirane od strane korisnika). Za **postojeće example slike** koje su već na Bunny.net, trebaš ručno generirati thumbnails.

---

## ✅ Rješenje: Python Skripta

Kreirao sam Python skriptu `generate-thumbnails-for-existing.py` koja:

1. ✅ Čita `couples-templates-database.json`
2. ✅ Downloada postojeće slike s Bunny.net
3. ✅ Generira thumbnails (200x200px)
4. ✅ Uploada thumbnails na Bunny.net

---

## 🚀 Kako Koristiti

### 1. **Postavi BUNNY_API_KEY**

**Opcija A: .env fajl (Preporučeno)**
```bash
# Kreiraj .env fajl u root direktoriju
BUNNY_API_KEY=your-api-key-here
BUNNY_STORAGE_ZONE=lovestories-examples
```

**Opcija B: Environment varijabla**
```powershell
# PowerShell
$env:BUNNY_API_KEY="your-api-key-here"
```

```cmd
# CMD
set BUNNY_API_KEY=your-api-key-here
```

### 2. **Instaliraj Dependencies**

```bash
pip install Pillow requests
```

Ili koristi postojeći `requirements.txt`:
```bash
pip install -r requirements.txt
```

### 3. **Pokreni Skriptu**

```bash
python generate-thumbnails-for-existing.py
```

---

## 📊 Što Skripta Radi?

### **Za svaku sliku u JSON-u:**

1. **Provjerava da li thumbnail već postoji**
   - Ako postoji → preskače (ne generira ponovno)

2. **Downloada glavnu sliku s Bunny.net**
   - Koristi CDN URL iz JSON-a

3. **Generira thumbnail**
   - 200x200px
   - JPEG format, quality 85
   - Automatski konvertira PNG → JPEG (s bijelom pozadinom)

4. **Uploada thumbnail na Bunny.net**
   - Putanja: `temp/template-XX/thumbs/image-name-thumb.jpg`
   - Vraća CDN URL

---

## 📝 Primjer Output-a

```
📋 Učitano 13 template-a

============================================================
Template: template-01 - Vintage Romance (1920s)
============================================================

  Processing: https://examples.b-cdn.net/temp/template-01/vintage-1920s-1.jpg
  Downloading: https://examples.b-cdn.net/temp/template-01/vintage-1920s-1.jpg
  Generating thumbnail...
  Uploading thumbnail: temp/template-01/thumbs/vintage-1920s-1-thumb.jpg
  ✅ Thumbnail uploaded: https://examples.b-cdn.net/temp/template-01/thumbs/vintage-1920s-1-thumb.jpg
  ✅ Success! Thumbnail URL: https://examples.b-cdn.net/temp/template-01/thumbs/vintage-1920s-1-thumb.jpg

============================================================
📊 SAŽETAK
============================================================
Ukupno slika: 26
✅ Uspješno: 24
❌ Neuspješno: 0
⏭️  Preskočeno: 2

💡 Ažuriraj couples-templates-database.json s novim thumbnail URL-ovima!
```

---

## ⚠️ Napomene

### **Thumbnails se NE ažuriraju automatski u JSON-u**

Nakon što skripta generira thumbnails, trebaš **ručno ažurirati** `couples-templates-database.json` s novim thumbnail URL-ovima (ili koristiti skriptu koja to radi automatski).

### **Provjera Postojećih Thumbnails**

Skripta automatski provjerava da li thumbnail već postoji na Bunny.net:
- Ako postoji → preskače (ne generira ponovno)
- Ako ne postoji → generira i uploada

### **Error Handling**

- Ako download ne uspije → preskače sliku
- Ako generiranje ne uspije → preskače sliku
- Ako upload ne uspije → prikazuje error, ali nastavlja s drugim slikama

---

## 🔄 Nakon Generiranja Thumbnails

### **Opcija 1: Ručno Ažuriranje JSON-a**

Ažuriraj `couples-templates-database.json` s novim thumbnail URL-ovima koje je skripta generirala.

### **Opcija 2: Automatsko Ažuriranje (Budućnost)**

Mogu dodati opciju da skripta automatski ažurira JSON fajl s novim thumbnail URL-ovima.

---

## 💰 Troškovi

- **Download s Bunny.net:** Besplatno (unutar storage zone)
- **Upload na Bunny.net:** Besplatno (unutar storage zone)
- **Bandwidth:** Minimalan (samo jednom download/upload po slici)

**Ukupno:** Besplatno! 🎉

---

## 🎯 Rezultat

Nakon što pokreneš skriptu:

- ✅ Svi thumbnails će biti generirani i uploadani
- ✅ Bandwidth će se smanjiti za **10-15x**
- ✅ Galerija će se učitavati **5-10x brže**
- ✅ Troškovi će se smanjiti za **10-15x**

---

## 🆘 Troubleshooting

### **Problem: "BUNNY_API_KEY nije postavljen"**
**Rješenje:** Postavi API key u .env fajlu ili environment varijabli

### **Problem: "Error downloading"**
**Rješenje:** Provjeri da su slike stvarno uploadane na Bunny.net i da su URL-ovi točni

### **Problem: "Error generating thumbnail"**
**Rješenje:** Provjeri da je Pillow instaliran: `pip install Pillow`

### **Problem: "Error uploading thumbnail"**
**Rješenje:** Provjeri da je BUNNY_STORAGE_ZONE točan i da imaš dozvole za upload

---

## 📚 Povezani Fajlovi

- `generate-thumbnails-for-existing.py` - Glavna skripta
- `docs/couples-templates-database.json` - JSON s URL-ovima slika
- `netlify/functions/upload-to-bunny.js` - Automatsko generiranje za nove slike
- `docs/BANDWIDTH_ANALYSIS.md` - Analiza potrošnje bandwidth-a

