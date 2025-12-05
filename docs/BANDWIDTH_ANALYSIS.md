# 💰 Analiza Potrošnje Bandwidth-a (Bez Thumbnails)

## ⚠️ Problem: Samo Originalne Velike Slike

Ako imaš **samo originalne velike slike** bez thumbnails, to znači:

---

## 📊 Usporedba Potrošnje

### **S Thumbnails (Preporučeno):**
- **Thumbnail:** 200x200px = ~15-30 KB po slici
- **Glavna slika:** 1200x900px = ~200-500 KB po slici
- **Ukupno za galeriju (10 slika):** ~2-5 MB

### **Bez Thumbnails (Trenutno):**
- **Samo glavna slika:** 1200x900px = ~200-500 KB po slici
- **Ukupno za galeriju (10 slika):** ~2-5 MB **ZA SVAKU GALERIJU**
- **Problem:** Browser downloada **CIJELU SLIKU** samo za prikaz thumbnails!

---

## 💸 Troškovi Bunny.net Bandwidth

### **Bunny.net Cijene (Storage + CDN):**
- **Storage:** ~$0.01/GB mjesečno
- **Bandwidth (CDN):** ~$0.01-0.05/GB (ovisno o planu)

### **Primjer:**
Ako imaš **13 template-a** × **2 example slike** = **26 slika**

**S Thumbnails:**
- Thumbnails: 26 × 20 KB = **520 KB** po učitavanju galerije
- Glavne slike: samo kada korisnik klikne (fullscreen)

**Bez Thumbnails:**
- Glavne slike: 26 × 300 KB = **7.8 MB** po učitavanju galerije
- **15x više bandwidth-a!**

### **Mjesečna Potrošnja (1000 posjeta):**
- **S Thumbnails:** ~520 MB = **$0.02-0.03**
- **Bez Thumbnails:** ~7.8 GB = **$0.08-0.39**

**Razlika:** **10-15x više troškova!**

---

## 🐌 Utjecaj na Performanse

### **Brzina Učitavanja:**

**S Thumbnails:**
- Galerija se učita za **1-2 sekunde**
- Glavne slike se učitavaju samo kada korisnik klikne

**Bez Thumbnails:**
- Galerija se učita za **5-10 sekundi** (ovisno o brzini interneta)
- Korisnik mora čekati dok se sve velike slike učitaju

### **Korisničko Iskustvo:**
- ❌ Sporije učitavanje
- ❌ Više podataka za korisnike na mobilnim mrežama
- ❌ Više troškova za tebe

---

## ✅ Rješenje: Generiraj Thumbnails

### **Opcija 1: Automatski (Preporučeno)**
Koristi `sharp` biblioteku u Netlify Function (`upload-to-bunny.js`):
- Automatski generira thumbnails pri uploadu
- **Besplatno** - nema dodatnih troškova
- **200x200px** thumbnails = ~20 KB po slici

### **Opcija 2: Ručno Upload**
Uploadaj thumbnails ručno na Bunny.net:
- Generiraj thumbnails lokalno (Python `Pillow` ili online tool)
- Uploadaj u `template-XX/thumbs/` foldere
- Format: `image-name-thumb.jpg`

### **Opcija 3: CSS Resize (Fallback)**
Ako thumbnail ne postoji, CSS automatski resize-uje:
- **Problem:** Browser i dalje downloada cijelu veliku sliku
- **Nije rješenje** - samo vizualno smanjuje, ne smanjuje bandwidth!

---

## 📋 Preporuka

### **Za Example Slike:**
1. **Generiraj thumbnails** (200x200px) lokalno
2. **Uploadaj na Bunny.net** u `thumbs/` foldere
3. **Ažuriraj JSON** da uključuje thumbnail URL-ove

### **Za Generirane Slike:**
- ✅ Već automatski generira thumbnails (`upload-to-bunny.js`)
- ✅ Nema potrebe za ručnim radom

---

## 🎯 Rezultat

**S Thumbnails:**
- ✅ **10-15x manje bandwidth-a**
- ✅ **10-15x niži troškovi**
- ✅ **5-10x brže učitavanje**
- ✅ **Bolje korisničko iskustvo**

**Bez Thumbnails:**
- ❌ **10-15x više bandwidth-a**
- ❌ **10-15x viši troškovi**
- ❌ **5-10x sporije učitavanje**
- ❌ **Lošije korisničko iskustvo**

---

## 💡 Zaključak

**Thumbnails su KRITIČNI za:**
1. **Smanjenje troškova** (10-15x manje bandwidth-a)
2. **Brzinu učitavanja** (5-10x brže)
3. **Korisničko iskustvo** (brže, manje podataka)

**Preporuka:** Generiraj thumbnails za sve example slike!

