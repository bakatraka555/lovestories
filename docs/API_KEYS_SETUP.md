# 🔑 API Keys Setup - Gdje Što Ide?

## 📋 Pregled

Imaš **2 različita API key-a** koja idu na **različita mjesta**:

1. **Replicate API Token** → **Netlify** (za order.html stranicu)
2. **Bunny.net API Key** → **Lokalno** (za upload skripte)

---

## 🔵 Replicate API Token → Netlify

### Zašto u Netlify?

- Koristi se u `order.html` stranici
- Netlify Functions pozivaju Replicate API
- Sigurno - token nije vidljiv u frontend kodu

### Kako Postaviti:

1. **Idi na Netlify Dashboard:**
   - https://app.netlify.com
   - Odaberi svoj site: `lovestories-dubrovnik`

2. **Site settings → Environment variables**

3. **Dodaj variable:**
   - **Key:** `REPLICATE_API_TOKEN`
   - **Value:** Tvoj Replicate API token
     - (Dobiješ ga na https://replicate.com/account/api-tokens)
   - **Scopes:** All environments (Production, Deploy previews, Branch deploys)

4. **Save**

5. **Redeploy site** (ako je već deployan):
   - Deploys → Trigger deploy → Clear cache and deploy site

---

## 🟡 Bunny.net API Key → Lokalno (NE u Netlify!)

### Zašto NE u Netlify?

- Koristi se samo za **lokalne upload skripte**
- Nije potreban za `order.html` stranicu
- Koristi se samo kada uploaduješ primjere

### Gdje Postaviti:

**Lokalno u terminalu (za upload skripte):**

```bash
# Windows PowerShell
$env:BUNNY_API_KEY="tvoj-bunny-api-key"
$env:BUNNY_STORAGE_ZONE="lovestories-examples"

# Windows CMD
set BUNNY_API_KEY=tvoj-bunny-api-key
set BUNNY_STORAGE_ZONE=lovestories-examples

# Linux/Mac
export BUNNY_API_KEY="tvoj-bunny-api-key"
export BUNNY_STORAGE_ZONE="lovestories-examples"
```

**Ili u `.env` fileu (ne commitaj u Git!):**

```env
BUNNY_API_KEY=tvoj-bunny-api-key
BUNNY_STORAGE_ZONE=lovestories-examples
```

---

## 📊 Tabela: Gdje Što Ide

| API Key | Gdje Ide | Za Što Se Koristi |
|---------|----------|-------------------|
| **Replicate API Token** | ✅ **Netlify** (Environment Variables) | `order.html` → Netlify Functions → Replicate API |
| **Bunny.net API Key** | ✅ **Netlify** (Environment Variables) | `order.html` → Netlify Functions → Upload rezultata na Bunny.net |
| **Bunny.net Storage Zone** | ✅ **Netlify** (Environment Variables) | Storage Zone name za upload |

---

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Replicate token u Netlify Environment Variables
- ✅ Bunny.net API Key lokalno (samo za upload skripte)
- ✅ Koristi Netlify Functions za Replicate API pozive
- ✅ Ne commitaj API key-eve u Git

### ❌ DON'T:
- ❌ Ne stavljaj Bunny.net API Key u Netlify (nije potreban)
- ❌ Ne stavljaj API key-eve direktno u frontend kod
- ❌ Ne commitaj API key-eve u Git

---

## 🧪 Testiranje

### Test Replicate API (u Netlify):

1. **Provjeri da je token postavljen:**
   - Netlify Dashboard → Site settings → Environment variables
   - Trebao bi vidjeti `REPLICATE_API_TOKEN`

2. **Testiraj u Netlify Function:**
   - Kreiraj test function koji koristi `process.env.REPLICATE_API_TOKEN`
   - Provjeri da radi

### Test Bunny.net API (Lokalno):

1. **Postavi environment varijable** (gore)
2. **Pokreni upload skriptu:**
   ```bash
   python generate-and-upload-single.py template-01
   ```
3. **Provjeri da upload radi**

---

## 📝 Checklist

- [ ] Replicate API Token kreiran na replicate.com
- [ ] Replicate API Token dodan u Netlify Environment Variables
- [ ] Bunny.net API Key kreiran na bunny.net
- [ ] Bunny.net API Key postavljen lokalno (terminal/.env)
- [ ] Site redeployan (ako je već bio deployan)
- [ ] Testirao Replicate API (kroz Netlify Function)
- [ ] Testirao Bunny.net API (lokalno upload)

---

## 🔗 Korisni Linkovi

- **Netlify Environment Variables:** https://app.netlify.com → Site settings → Environment variables
- **Replicate API Tokens:** https://replicate.com/account/api-tokens
- **Bunny.net API Keys:** https://bunny.net/dashboard/account/api-keys

