# 🚀 Netlify API Setup - Brzi Vodič

## ✅ Postavi Replicate API Token u Netlify

### Korak 1: Dobij Replicate API Token

1. **Otvori:** https://replicate.com/account/api-tokens
2. **Ako nemaš token:**
   - Klikni **"Create token"** ili **"Generate API Key"**
   - Unesi naziv (npr. "lovestories-netlify")
   - Klikni **"Create"**
3. **Kopiraj token:**
   - ⚠️ **VAŽNO:** Ovo je jednom vidljivo - kopiraj odmah!
   - Format: `r8_...` (dugački string)

---

### Korak 2: Postavi u Netlify

1. **Otvori Netlify Dashboard:**
   - https://app.netlify.com
   - Prijavi se

2. **Odaberi svoj site:**
   - Klikni na site: `lovestories-dubrovnik` (ili kako se zove)

3. **Idi na Site settings:**
   - Klikni **"Site settings"** (gore desno, ikona zupčanika ⚙️)
   - Ili: Desno klik na site → **"Site settings"**

4. **Environment variables:**
   - U lijevom meniju klikni **"Environment variables"**
   - Ili scrollaj do **"Build & deploy"** → **"Environment variables"**

5. **Dodaj variable:**
   - Klikni **"Add variable"** ili **"Add environment variable"**
   - **Key:** `REPLICATE_API_TOKEN`
   - **Value:** Zalijepi tvoj Replicate token (onaj koji si kopirao)
   - **Scopes:** Ostavi default (sve environments)
   - Klikni **"Save"** ili **"Add variable"**

6. **Provjeri:**
   - Trebao bi vidjeti `REPLICATE_API_TOKEN` u listi
   - Value bi trebao biti maskiran (****)

---

### Korak 3: Redeploy Site

**VAŽNO:** Ako je site već deployan, trebaš ga redeployati da učita novi environment variable!

1. **Idi na "Deploys"** u Netlify dashboardu
2. **Klikni "Trigger deploy"** → **"Clear cache and deploy site"**
3. **Ili:** Napravi mali commit i push (npr. promijeni README)
   - Netlify će automatski redeployati

---

## ✅ Provjera

### Provjeri da je postavljeno:

1. **Netlify Dashboard:**
   - Site settings → Environment variables
   - Trebao bi vidjeti `REPLICATE_API_TOKEN` ✅

2. **Test u Netlify Function:**
   - Kreiraj test function koji koristi `process.env.REPLICATE_API_TOKEN`
   - Provjeri da radi

---

## 🔧 Sljedeći Korak: Kreiraj Netlify Function

Nakon što si postavio API token, trebaš kreirati Netlify Function koja će koristiti Replicate API.

**Želiš li da kreiram Netlify Function za Replicate API pozive?**

---

## 📝 Checklist

- [ ] Replicate API token kreiran na replicate.com
- [ ] Token kopiran i spremljen sigurno
- [ ] Token dodan u Netlify Environment Variables
- [ ] Variable name: `REPLICATE_API_TOKEN`
- [ ] Site redeployan
- [ ] Provjereno da token radi

---

## 🔗 Korisni Linkovi

- **Netlify Dashboard:** https://app.netlify.com
- **Replicate API Tokens:** https://replicate.com/account/api-tokens
- **Netlify Environment Variables Docs:** https://docs.netlify.com/environment-variables/overview/

