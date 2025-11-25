# 🧪 Testiranje Netlify Functions

## ✅ Test Funkcija Radi!

Test funkcija je uspješno deployana i radi:
```
https://lovestories-dubrovnik.netlify.app/.netlify/functions/test
```

---

## 🔍 Testiranje generate-image Funkcije

### 1. Test s Browser Console

Otvori browser console (F12) i pokreni:

```javascript
fetch('/.netlify/functions/generate-image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    templateId: 'template-01',
    image1: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==', // dummy base64
    isCouple: false
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### 2. Provjeri Environment Variables

Netlify Dashboard → Site settings → Environment variables:

Provjeri da li su postavljeni:
- ✅ `REPLICATE_API_TOKEN`
- ✅ `BUNNY_API_KEY`
- ✅ `BUNNY_STORAGE_ZONE`

### 3. Provjeri Logs

Netlify Dashboard → Functions → generate-image → Logs

Trebao bi vidjeti:
- `=== generate-image function called ===`
- `HTTP Method: POST`
- `Parsing request body...`

---

## 🐛 Ako Dobivaš "Method not allowed"

**Razlog:** Funkcija se poziva s GET umjesto POST

**Rješenje:**
1. Provjeri da li `order.html` koristi `method: 'POST'`
2. Provjeri browser console za greške
3. Provjeri Network tab u browser dev tools

---

## ✅ Ako Funkcija Radi Ali Vraća Grešku

Provjeri:
1. **Environment variables** - da li su postavljeni?
2. **Bunny.net upload** - da li API key radi?
3. **Replicate API** - da li token radi?

---

## 📝 Next Steps

1. Testiraj `generate-image` funkciju direktno (vidi gore)
2. Provjeri environment variables
3. Provjeri logs u Netlify Dashboard
4. Javi što vidiš!

