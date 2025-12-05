# 🔑 Kako Dobiti BUNNY_API_KEY iz Netlify-a

## 📋 Koraci

### 1. **Otvori Netlify Dashboard**
Idi na: https://app.netlify.com

### 2. **Otvori Tvoj Site**
- Klikni na tvoj site (npr. `lovestories-dubrovnik`)

### 3. **Otvori Site Settings**
- Klikni na **Site settings** (ili **Settings**)

### 4. **Otvori Environment Variables**
- U lijevom meniju klikni na **Environment variables**
- Ili idi direktno na: `https://app.netlify.com/sites/YOUR_SITE_NAME/settings/deploys#environment-variables`

### 5. **Pronađi BUNNY_API_KEY**
- Pronađi `BUNNY_API_KEY` u listi
- Klikni na **eye icon** (👁️) da vidiš vrijednost
- **Kopiraj vrijednost**

### 6. **Kreiraj Lokalni .env Fajl**

Kreiraj `.env` fajl u root direktoriju projekta:

```bash
# .env
BUNNY_API_KEY=your-copied-api-key-here
BUNNY_STORAGE_ZONE=lovestories-examples
```

**⚠️ VAŽNO:** 
- `.env` fajl **NE PUSH-aj** na GitHub (već bi trebao biti u `.gitignore`)
- Drži API key sigurnim i privatnim

---

## 🚀 Alternativno: Postavi Environment Varijablu

### **PowerShell:**
```powershell
$env:BUNNY_API_KEY="your-api-key-here"
$env:BUNNY_STORAGE_ZONE="lovestories-examples"
```

### **CMD:**
```cmd
set BUNNY_API_KEY=your-api-key-here
set BUNNY_STORAGE_ZONE=lovestories-examples
```

---

## ✅ Provjera

Nakon postavljanja, provjeri:

```powershell
# PowerShell
echo $env:BUNNY_API_KEY

# CMD
echo %BUNNY_API_KEY%
```

---

## 🔒 Sigurnost

- **NE dijelj** API key javno
- **NE push-aj** `.env` fajl na GitHub
- Koristi `.gitignore` da zaštitiš `.env` fajl

