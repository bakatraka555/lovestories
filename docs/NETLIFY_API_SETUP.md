# 🔑 Netlify - Postavljanje API Tokena

## ✅ Da, API Token Ide u Netlify!

Za Replicate API token, postavi ga u **Netlify Environment Variables**.

---

## 🔧 Korak 1: Idi na Netlify Dashboard

1. **Otvori:** https://app.netlify.com
2. **Odaberi svoj site:** `lovestories-dubrovnik` (ili kako se zove)
3. **Idi na:** **Site settings** (gore desno, ikona zupčanika)

---

## 🔑 Korak 2: Dodaj Environment Variable

1. **U Site settings:**
   - Scrollaj do **"Environment variables"** sekcije
   - Ili klikni **"Environment variables"** u lijevom meniju

2. **Klikni "Add variable"** ili **"Add environment variable"**

3. **Unesi:**
   - **Key:** `REPLICATE_API_TOKEN`
   - **Value:** Tvoj Replicate API token
     - (Dobiješ ga na https://replicate.com/account/api-tokens)
   - **Scopes:** Ostavi default (sve environments)

4. **Klikni "Save"** ili **"Add variable"**

---

## 📝 Korak 3: Provjeri da Je Postavljeno

1. **U Environment variables listi:**
   - Trebao bi vidjeti: `REPLICATE_API_TOKEN`
   - Value bi trebao biti maskiran (****)

2. **Provjeri scope:**
   - Trebao bi biti dostupan u svim environments (Production, Deploy previews, Branch deploys)

---

## 🔄 Korak 4: Redeploy Site (Ako Je Već Deployan)

Ako si već deployao site prije nego što si dodao environment variable:

1. **Idi na "Deploys"** u Netlify dashboardu
2. **Klikni "Trigger deploy"** → **"Clear cache and deploy site"**
3. Netlify će redeployati s novim environment variables

**Ili:**
- Napravi mali commit i push (npr. promijeni README)
- Netlify će automatski redeployati

---

## 🧪 Korak 5: Testiraj u Kodu

U `order.html` ili Netlify Functions, možeš pristupiti environment variable:

### U Netlify Functions (Serverless):

```javascript
// netlify/functions/generate-image.js
exports.handler = async (event, context) => {
  const replicateToken = process.env.REPLICATE_API_TOKEN;
  
  // Koristi token za Replicate API pozive
  const response = await fetch('https://api.replicate.com/v1/models/...', {
    headers: {
      'Authorization': `Token ${replicateToken}`
    }
  });
  
  // ...
};
```

### U Frontend Kodu (order.html):

**⚠️ VAŽNO:** Ne koristi API token direktno u frontend kodu!
- Token bi bio vidljiv svima
- Umjesto toga, koristi Netlify Functions kao proxy

**Pravilno:**
```javascript
// order.html - pozovi Netlify Function
const response = await fetch('/.netlify/functions/generate-image', {
  method: 'POST',
  body: JSON.stringify({ image: ... })
});
```

---

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Postavi API token u Netlify Environment Variables
- ✅ Koristi Netlify Functions za API pozive
- ✅ Ne commitaj token u Git
- ✅ Koristi različite tokene za Production/Development

### ❌ DON'T:
- ❌ Ne stavljaj token direktno u frontend kod
- ❌ Ne commitaj token u `netlify.toml` ili bilo koji file
- ❌ Ne dijelj token javno

---

## 📋 Checklist

- [ ] Replicate API token kreiran na replicate.com
- [ ] Token dodan u Netlify Environment Variables
- [ ] Variable name: `REPLICATE_API_TOKEN`
- [ ] Site redeployan (ako je već bio deployan)
- [ ] Token testiran u Netlify Functions

---

## 🆘 Troubleshooting

### Problem: "REPLICATE_API_TOKEN is undefined"

**Rješenje:**
1. Provjeri da si dodao environment variable u Netlify
2. Provjeri da je variable name točan: `REPLICATE_API_TOKEN`
3. Redeploy site (Clear cache and deploy)
4. Provjeri da koristiš `process.env.REPLICATE_API_TOKEN` u kodu

### Problem: "Token not working"

**Rješenje:**
1. Provjeri da si kopirao cijeli token (bez razmaka)
2. Provjeri da je token aktivan na replicate.com
3. Provjeri da imaš dozvole za model koji koristiš

---

## 🔗 Korisni Linkovi

- **Netlify Dashboard:** https://app.netlify.com
- **Replicate API Tokens:** https://replicate.com/account/api-tokens
- **Netlify Environment Variables Docs:** https://docs.netlify.com/environment-variables/overview/
- **Netlify Functions:** https://docs.netlify.com/functions/overview/

---

## 💡 Napomena

**Environment Variables su dostupni u:**
- ✅ Netlify Functions (serverless)
- ✅ Build procesima
- ❌ Frontend kodu direktno (security risk!)

**Za frontend API pozive:**
- Koristi Netlify Functions kao proxy
- Function poziva Replicate API s tokenom
- Function vraća rezultat frontendu

