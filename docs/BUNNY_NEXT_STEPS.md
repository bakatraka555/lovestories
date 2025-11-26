# 🐰 Bunny.net - Što Dalje Nakon Pull Zone Kreiranja

## ✅ Što Si Napravio

- ✅ Storage Zone kreiran: `lovestories-examples`
- ✅ Pull Zone kreiran: `lovestories-cdn`
- ✅ CDN URL: `https://lovestories-cdn.b-cdn.net`

---

## 🔑 Korak 1: API Key (Za Upload Fileova)

### Gdje Se Nalazi API Key?

1. **U Bunny.net dashboardu:**
   - Idi na **"Account"** (gore desno, klikni na svoj profil)
   - Klikni **"API Keys"** ili **"API"**
   - Ili direktno: https://bunny.net/dashboard/account/api-keys

2. **Generiraj API Key:**
   - Klikni **"Generate API Key"** ili **"Add API Key"**
   - Unesi naziv (npr. "lovestories-upload")
   - Klikni "Generate"

3. **Zapiši API Key:**
   - ⚠️ **VAŽNO:** Ovo je jednom vidljivo!
   - Kopiraj i spremi negdje sigurno
   - Format: dugački string (npr. `abc123def456...`)

---

## 📤 Korak 2: Upload Primjera

### Opcija A: Preko Bunny.net Dashboard (Najlakše)

1. **Idi na Storage → lovestories-examples**
2. **Klikni "Upload"** (gumb s upload ikonom)
3. **Uploadaj fileove:**
   - Kreiraj folder strukturu:
     ```
     template-01/
       ├── vintage-1920s-1.jpg
       ├── vintage-1920s-2.jpg
       ├── vintage-1920s-1.mp4
       └── thumbs/
           ├── vintage-1920s-1-thumb.jpg
           └── vintage-1920s-2-thumb.jpg
     ```
   - Ili uploadaj direktno u root i organiziraj kasnije

### Opcija B: Preko FTP (Za Veće Količine)

1. **Koristi FTP client** (FileZilla, WinSCP, itd.)
2. **Poveži se:**
   - **Host:** `storage.bunnycdn.com` (ili `lovestories-examples.bunnycdn.com`)
   - **Username:** `lovestories-examples`
   - **Password:** (iz Storage Zone settings - možeš refreshati)
   - **Port:** `21`
   - **Connection type:** Passive

3. **Uploadaj fileove** u odgovarajuće foldere

### Opcija C: Preko API (Programski)

Koristi Bunny.net Storage API za automatski upload.

**Primjer JavaScript:**
```javascript
const file = // tvoj file
const fileName = 'template-01/vintage-1920s-1.jpg';
const apiKey = 'tvoj-api-key';

fetch(`https://storage.bunnycdn.com/lovestories-examples/${fileName}`, {
  method: 'PUT',
  headers: {
    'AccessKey': apiKey
  },
  body: file
});
```

---

## 📝 Korak 3: Ažuriraj JSON Datoteku

Nakon uploada primjera, ažuriraj URL-ove u `docs/couples-templates-database.json`:

### Format URL-a:

```json
{
  "url": "https://lovestories-cdn.b-cdn.net/template-01/vintage-1920s-1.jpg",
  "thumbnail": "https://lovestories-cdn.b-cdn.net/template-01/thumbs/vintage-1920s-1-thumb.jpg"
}
```

**Struktura:**
- CDN URL: `https://lovestories-cdn.b-cdn.net/`
- + Putanja: `template-01/vintage-1920s-1.jpg`
- = Full URL: `https://lovestories-cdn.b-cdn.net/template-01/vintage-1920s-1.jpg`

---

## 🧪 Korak 4: Testiraj

1. **Otvori CDN URL direktno:**
   ```
   https://lovestories-cdn.b-cdn.net/template-01/vintage-1920s-1.jpg
   ```
   - Trebao bi vidjeti sliku

2. **Provjeri u photo booth-u:**
   - Otvori `museum-kiosk.html`
   - Odaberi template
   - Provjeri da se primjeri učitavaju

---

## 📋 Checklist

- [ ] API Key generiran i spremljen
- [ ] Primjeri uploadani na Bunny.net Storage
- [ ] JSON datoteka ažurirana s novim URL-ovima
- [ ] Testirao da se primjeri učitavaju
- [ ] Photo booth prikazuje primjere

---

## 🔗 Korisni Linkovi

- **Bunny.net Dashboard:** https://bunny.net/dashboard
- **API Keys:** https://bunny.net/dashboard/account/api-keys
- **Storage API Docs:** https://docs.bunny.net/reference/storage-api
- **Pull Zone API:** https://docs.bunny.net/reference/pull-zone-api

---

## 💡 Napomena

**API Key se koristi za:**
- Upload fileova preko API-ja
- Programski pristup Storage Zone-u
- Automatizacija upload procesa

**Nije potreban za:**
- Upload preko dashboarda (ne treba API Key)
- Upload preko FTP (koristi FTP password)
- Pristup fileovima preko CDN (javno dostupno)

---

## 🆘 Ako Trebaš Pomoć

- **Upload fileova:** Koristi dashboard (najlakše)
- **API integracija:** Provjeri Bunny.net Storage API docs
- **URL format:** Provjeri Pull Zone URL u dashboardu

