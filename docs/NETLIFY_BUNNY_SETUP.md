# 🐰 Netlify - Postavljanje Bunny.net API Key

## ✅ Dodaj Bunny.net API Key u Netlify

Bunny.net API key se koristi za upload generiranih rezultata na Bunny.net Storage nakon što korisnici generiraju svoje transformacije.

---

## 🔧 Korak 1: Dobij Bunny.net API Key

1. **Otvori:** https://bunny.net/dashboard/account/api-keys
2. **Ako nemaš API Key:**
   - Klikni **"Generate API Key"** ili **"Add API Key"**
   - Unesi naziv (npr. "lovestories-netlify")
   - Klikni **"Generate"**
3. **Kopiraj API Key:**
   - ⚠️ **VAŽNO:** Ovo je jednom vidljivo - kopiraj odmah!
   - Format: dugački string

---

## 🔧 Korak 2: Postavi u Netlify

1. **Otvori Netlify Dashboard:**
   - https://app.netlify.com
   - Odaberi svoj site: `lovestories-dubrovnik`

2. **Idi na Site settings:**
   - Klikni **"Site settings"** (gore desno, ikona zupčanika ⚙️)

3. **Environment variables:**
   - U lijevom meniju klikni **"Environment variables"**

4. **Dodaj prvi variable (API Key):**
   - Klikni **"Add variable"**
   - **Key:** `BUNNY_API_KEY`
   - **Value:** Zalijepi tvoj Bunny.net API Key
   - **Scopes:** Ostavi default (sve environments)
   - Klikni **"Save"**

5. **Dodaj drugi variable (Storage Zone):**
   - Klikni **"Add variable"** ponovno
   - **Key:** `BUNNY_STORAGE_ZONE`
   - **Value:** `lovestories-examples` (ili tvoj Storage Zone name)
   - **Scopes:** Ostavi default
   - Klikni **"Save"**

6. **Provjeri:**
   - Trebao bi vidjeti oba variable-a:
     - `BUNNY_API_KEY` ✅
     - `BUNNY_STORAGE_ZONE` ✅
   - Values bi trebali biti maskirani (****)

---

## 🔄 Korak 3: Redeploy Site

**VAŽNO:** Ako je site već deployan, trebaš ga redeployati!

1. **Idi na "Deploys"** u Netlify dashboardu
2. **Klikni "Trigger deploy"** → **"Clear cache and deploy site"**
3. **Ili:** Napravi mali commit i push
   - Netlify će automatski redeployati

---

## 📋 Environment Variables u Netlify

Nakon postavljanja, trebao bi imati:

| Key | Value | Za Što |
|-----|-------|--------|
| `REPLICATE_API_TOKEN` | `r8_...` | Replicate API pozivi |
| `BUNNY_API_KEY` | `...` | Upload na Bunny.net Storage |
| `BUNNY_STORAGE_ZONE` | `lovestories-examples` | Storage Zone name |

---

## 🔧 Kako Se Koristi u Netlify Functions

U Netlify Function možeš pristupiti environment variables:

```javascript
// netlify/functions/upload-to-bunny.js
exports.handler = async (event, context) => {
  const apiKey = process.env.BUNNY_API_KEY;
  const storageZone = process.env.BUNNY_STORAGE_ZONE;
  
  // Upload file na Bunny.net
  const response = await fetch(
    `https://storage.bunnycdn.com/${storageZone}/filename.jpg`,
    {
      method: 'PUT',
      headers: {
        'AccessKey': apiKey,
        'Content-Type': 'image/jpeg'
      },
      body: fileData
    }
  );
  
  // ...
};
```

---

## ✅ Provjera

### Provjeri da je postavljeno:

1. **Netlify Dashboard:**
   - Site settings → Environment variables
   - Trebao bi vidjeti:
     - `REPLICATE_API_TOKEN` ✅
     - `BUNNY_API_KEY` ✅
     - `BUNNY_STORAGE_ZONE` ✅

2. **Test u Netlify Function:**
   - Kreiraj test function koji koristi `process.env.BUNNY_API_KEY`
   - Provjeri da radi

---

## 📝 Checklist

- [ ] Bunny.net API Key kreiran na bunny.net
- [ ] API Key kopiran i spremljen sigurno
- [ ] `BUNNY_API_KEY` dodan u Netlify Environment Variables
- [ ] `BUNNY_STORAGE_ZONE` dodan u Netlify Environment Variables
- [ ] Site redeployan
- [ ] Provjereno da variables rade

---

## 🔗 Korisni Linkovi

- **Netlify Dashboard:** https://app.netlify.com
- **Bunny.net API Keys:** https://bunny.net/dashboard/account/api-keys
- **Netlify Environment Variables Docs:** https://docs.netlify.com/environment-variables/overview/

