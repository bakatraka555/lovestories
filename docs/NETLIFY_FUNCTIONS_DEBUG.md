# 🐛 Netlify Functions - Debug Vodič

## ❓ Problem: Nema Logova

Ako ne vidiš logove u Netlify Functions, provjeri:

### 1. Da li je Funkcija Deployana?

1. **Netlify Dashboard → Functions**
   - Trebao bi vidjeti listu funkcija
   - Ako ne vidiš `generate-image`, funkcija nije deployana

2. **Provjeri Deploy Logs:**
   - Netlify Dashboard → Deploys → Latest deploy → Build log
   - Traži: "Installing dependencies" ili "Functions bundling"

### 2. Da li se Funkcija Poziva?

**Testiraj direktno:**
```
https://lovestories-dubrovnik.netlify.app/.netlify/functions/generate-image
```

**Očekivani odgovor:**
- Ako funkcija postoji: `{"error":"Method not allowed"}` (jer nije POST)
- Ako funkcija ne postoji: 404 Not Found

### 3. Provjeri Environment Variables

**Netlify Dashboard → Site settings → Environment variables:**

Provjeri da li su postavljeni:
- ✅ `REPLICATE_API_TOKEN`
- ✅ `BUNNY_API_KEY`
- ✅ `BUNNY_STORAGE_ZONE`

### 4. Provjeri package.json

Netlify Functions trebaju `package.json` u root folderu s dependencies:

```json
{
  "dependencies": {
    "node-fetch": "^2.6.7"
  }
}
```

### 5. Provjeri netlify.toml

```toml
[functions]
  directory = "netlify/functions"
```

---

## 🔍 Kako Provjeriti Logove

### Opcija 1: Netlify Dashboard

1. **Netlify Dashboard → Functions → generate-image**
2. Klikni na funkciju
3. Idi na **"Logs"** tab
4. Pozovi funkciju s frontenda
5. Refreshaj logs

### Opcija 2: Netlify CLI

```bash
# Instaliraj Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Vidi live logs
netlify functions:log generate-image
```

### Opcija 3: Browser Console

1. Otvori browser console (F12)
2. Idi na Network tab
3. Pozovi funkciju
4. Provjeri response

---

## 🐛 Česti Problemi

### Problem 1: "Function not found"

**Razlog:** Funkcija nije deployana ili je u krivom folderu

**Rješenje:**
- Provjeri da li je `netlify/functions/generate-image.js` u repo-u
- Provjeri `netlify.toml` - `[functions] directory = "netlify/functions"`
- Redeploy site

### Problem 2: "Module not found: prompts.js"

**Razlog:** `prompts.js` možda ne može učitati MD file

**Rješenje:**
- Provjeri da li je `docs/NANO_BANANA_PROMPT.md` u repo-u
- Možda treba hardcode promptove umjesto čitanja iz MD filea

### Problem 3: "Bunny.net API not configured"

**Razlog:** Environment variables nisu postavljeni

**Rješenje:**
- Netlify Dashboard → Site settings → Environment variables
- Dodaj `BUNNY_API_KEY` i `BUNNY_STORAGE_ZONE`

### Problem 4: "Internal server error" bez detalja

**Razlog:** Greška u kodu, ali se ne logira

**Rješenje:**
- Provjeri da li su svi `console.log` pozivi u kodu
- Provjeri da li funkcija ima try-catch blokove
- Provjeri Netlify Functions logs

---

## ✅ Test Funkcije Direktno

**Test s curl:**

```bash
curl -X POST https://lovestories-dubrovnik.netlify.app/.netlify/functions/generate-image \
  -H "Content-Type: application/json" \
  -d '{"templateId":"template-01","image1":"test","isCouple":false}'
```

**Očekivani odgovor:**
- Ako radi: Error o nedostajućim parametrima (jer `image1` nije validan base64)
- Ako ne radi: 404 ili 500

---

## 🔧 Quick Fix: Hardcode Prompts

Ako `prompts.js` ne radi (ne može čitati MD file), možemo hardcode promptove direktno u `generate-image.js`.

---

## 📞 Sljedeći Koraci

1. Provjeri da li funkcija postoji u Netlify Dashboard → Functions
2. Testiraj direktno URL: `/.netlify/functions/generate-image`
3. Provjeri environment variables
4. Provjeri deploy logs
5. Javi što vidiš!

