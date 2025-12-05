# 🐛 Troubleshooting: "Unexpected end of JSON input" Error

## 📋 Problem

Korisnik dobiva grešku:
```
error generating. failed to parse response: unexpected end of JSON input. response:
```

Ovo znači da response nije valjan JSON ili je prazan.

---

## 🔍 Mogući Uzroci

### 1. **Netlify Function Timeout**
- Netlify Functions imaju timeout od 10-26 sekundi
- Ako funkcija uzme previše vremena, Netlify može prekinuti response
- Rezultat: prazan ili nekompletan response

### 2. **Prazan Response Body**
- Funkcija možda ne vraća ništa u nekim slučajevima
- Network error tijekom prijenosa
- Funkcija se crash-a prije nego što vrati response

### 3. **Network Issues**
- Prekinuta konekcija
- Slow internet
- Proxy/CDN problemi

### 4. **Error u Netlify Function**
- Neka greška u kodu koja nije uhvaćena
- Missing dependencies
- Environment variables nisu postavljeni

---

## ✅ Rješenja (Već Implementirana)

### 1. **Poboljšan Error Handling u Frontendu**

**Lokacija:** `order.html`

**Što je dodano:**
- ✅ Provjera da li je response prazan prije parsiranja
- ✅ Provjera status koda
- ✅ Specifične error poruke za različite scenarije
- ✅ Timeout handling (30 sekundi)
- ✅ Detaljno logiranje za debugging

**Kod:**
```javascript
// Provjeri da li je response prazan
if (!responseText || responseText.trim().length === 0) {
    throw new Error('Empty response from server...');
}

// Provjeri status kod
if (generateResponse.status === 504) {
    throw new Error('Gateway timeout...');
}
```

### 2. **Poboljšan Error Handling u Netlify Function**

**Lokacija:** `netlify/functions/generate-image.js`

**Što je dodano:**
- ✅ Osiguravanje da uvijek vraća valjan JSON
- ✅ Try-catch blokovi oko svega
- ✅ Specifične error poruke
- ✅ Detaljno logiranje

**Kod:**
```javascript
} catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: errorMessage,
        details: errorDetails,
        timestamp: new Date().toISOString()
      })
    };
}
```

### 3. **Timeout Protection**

**Lokacija:** `order.html`

**Što je dodano:**
- ✅ 30 sekundi timeout na fetch request
- ✅ Timeout error handling
- ✅ Network error detection

---

## 🔍 Kako Debuggati

### Korak 1: Provjeri Browser Console

Otvori browser console (F12) i traži:
- Response status
- Response text
- Error poruke

### Korak 2: Provjeri Network Tab

1. Otvori Network tab u browser dev tools
2. Pronađi request na `/.netlify/functions/generate-image`
3. Provjeri:
   - Status kod
   - Response headers
   - Response body (da li je prazan?)

### Korak 3: Provjeri Netlify Logs

1. Netlify Dashboard → Functions → generate-image
2. Klikni na "Logs" tab
3. Traži error poruke ili timeout

### Korak 4: Testiraj Funkciju Direktno

```javascript
// U browser console:
fetch('/.netlify/functions/generate-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    templateId: 'template-01',
    image1Url: 'https://examples.b-cdn.net/temp/test.jpg',
    isCouple: false
  })
})
.then(r => r.text())
.then(console.log)
.catch(console.error);
```

---

## 🛠️ Mogući Fixovi

### Fix 1: Provjeri Environment Variables

Netlify Dashboard → Site settings → Environment variables:

Provjeri da li su postavljeni:
- ✅ `REPLICATE_API_TOKEN`
- ✅ `BUNNY_API_KEY`
- ✅ `BUNNY_STORAGE_ZONE`

### Fix 2: Provjeri da je Funkcija Deployana

Netlify Dashboard → Functions:

Provjeri da li vidiš:
- ✅ `generate-image`
- ✅ `upload-user-image`
- ✅ `check-prediction-status`

### Fix 3: Redeploy Site

Ako je nedavno promijenio kod:
1. Netlify Dashboard → Deploys
2. Klikni "Trigger deploy" → "Clear cache and deploy site"

### Fix 4: Provjeri Netlify Function Timeout

Netlify Functions imaju default timeout od 10 sekundi. Ako generiranje uzme duže, možda treba:
- Povećati timeout (ako je moguće)
- Ili optimizirati funkciju da završi brže

---

## 📊 Što Sada Radi

S novim error handling-om:

1. **Ako je response prazan:**
   - Korisnik vidi: "Empty response from server. This might be a timeout issue..."
   - Retry opcija je dostupna

2. **Ako je timeout:**
   - Korisnik vidi: "Request timeout - the server took too long to respond..."
   - Može pokušati ponovno

3. **Ako je network error:**
   - Korisnik vidi: "Network error - please check your internet connection..."
   - Jasna poruka što treba napraviti

4. **Ako je invalid JSON:**
   - Korisnik vidi detaljnu poruku s prvih 300 karaktera response-a
   - Može koristiti retry

---

## 🎯 Sljedeći Koraci

Ako se problem nastavi:

1. **Provjeri Netlify Logs** - vidi što se događa u funkciji
2. **Testiraj direktno** - pozovi funkciju s curl ili browser console
3. **Provjeri Environment Variables** - možda nedostaje API key
4. **Provjeri Network** - možda je problem s internetom

---

**Datum:** 2025-01-XX  
**Status:** ✅ Error handling poboljšan

