# 🐰 Bunny.net Setup Vodič

## 📋 Što je Bunny.net?

Bunny.net je CDN i storage servis koji ćeš koristiti za:
- **Hosting primjera** slika i videa (template primjeri)
- **CDN** za brzo učitavanje primjera
- **Storage** za generirane rezultate (opciono)

---

## 🚀 Korak 1: Registracija

1. **Otvori:** https://bunny.net
2. **Klikni "Sign Up"** ili "Get Started"
3. **Unesi podatke:**
   - Email
   - Password
   - Potvrdi email

---

## 💰 Korak 2: Odaberi Plan

### Free Tier (Početak):
- ✅ 1GB storage
- ✅ 50GB bandwidth/mjesec
- ✅ Dovoljno za testiranje

### Paid Plans:
- **$1/mjesec** - 10GB storage + 100GB bandwidth
- **$5/mjesec** - 50GB storage + 500GB bandwidth
- **$10/mjesec** - 100GB storage + 1TB bandwidth

**Za primjere (14 slika + 13 videa):** Free tier je dovoljan za početak!

---

## 📦 Korak 3: Kreiraj Storage Zone

1. **U Bunny.net dashboardu:**
   - Idi na **"Storage"** u lijevom meniju
   - Klikni **"Add Storage Zone"**

2. **Unesi podatke:**
   - **Name:** `lovestories-examples` (ili bilo koji naziv)
   - **Region:** Odaberi najbližu (npr. "Falkenstein" za EU)
   - **Replication:** Opciono (za backup)

3. **Klikni "Add Storage Zone"**

4. **Zapiši podatke:**
   - **Storage Zone Name:** (npr. `lovestories-examples`)
   - **FTP Password:** (generira se automatski)
   - **FTP Hostname:** (npr. `lovestories-examples.bunnycdn.com`)

---

## 🔑 Korak 4: API Key

1. **U Bunny.net dashboardu:**
   - Idi na **"Account"** → **"API Keys"**
   - Klikni **"Generate API Key"**

2. **Zapiši API Key:**
   - ⚠️ **VAŽNO:** Ovo je jednom vidljivo - spremi negdje sigurno!
   - Koristit ćeš ga za upload fileova

---

## 🌐 Korak 5: Kreiraj Pull Zone (CDN)

1. **U Bunny.net dashboardu:**
   - Idi na **"Pull Zones"** u lijevom meniju
   - Klikni **"Add Pull Zone"**

2. **Unesi podatke:**
   - **Name:** `lovestories-cdn` (ili bilo koji naziv)
   
   **VAŽNO - Odaberi ispravan Origin Type:**
   
   ### Opcija A: Koristiš Storage Zone (Preporučeno)
   - **Origin type:** Odaberi **"Storage Zone"** (ne "Origin URL"!)
   - **Storage Zone:** Odaberi svoj Storage Zone iz dropdowna
     - (npr. `lovestories-examples`)
   - **Host header:** Ostavi **PRAZNO** (ne treba)
   
   ### Opcija B: Koristiš vanjski server
   - **Origin type:** Odaberi **"Origin URL"**
   - **Origin URL:** `https://lovestories-examples.bunnycdn.com`
   - **Host header:** Ostavi prazno ili unesi origin hostname
   
   **Ostalo:**
   - **Cache Expiry:** 30 dana (ili koliko želiš)
   - **Optimize for:** Web (default)

3. **Klikni "Add Pull Zone"**

4. **Zapiši CDN URL:**
   - Format: `https://lovestories-cdn.b-cdn.net`
   - Ovo je URL koji ćeš koristiti u JSON datoteci!
   
**⚠️ VAŽNO:** Ako koristiš Storage Zone, **MORAŠ odabrati "Storage Zone" opciju**, ne "Origin URL"!

---

## 📁 Korak 6: Upload Primjera

### Opcija A: Preko Bunny.net Dashboard

1. **Storage → Tvoj Storage Zone**
2. **Klikni "Upload Files"**
3. **Uploadaj slike i video:**
   ```
   template-01/
     ├── vintage-1920s-1.jpg
     ├── vintage-1920s-2.jpg
     └── thumbs/
         ├── vintage-1920s-1-thumb.jpg
         └── vintage-1920s-2-thumb.jpg
   template-02/
     └── ...
   ```

### Opcija B: Preko FTP

1. **Koristi FTP client** (FileZilla, WinSCP, itd.)
2. **Poveži se:**
   - Host: `lovestories-examples.bunnycdn.com`
   - Username: Storage Zone Name
   - Password: FTP Password (iz koraka 3)

### Opcija C: Preko API (Programski)

Koristi Bunny.net API za automatski upload:
```javascript
// Primjer uploada preko API
const formData = new FormData();
formData.append('file', file);

fetch('https://storage.bunnycdn.com/lovestories-examples/template-01/image.jpg', {
  method: 'PUT',
  headers: {
    'AccessKey': 'tvoj-api-key'
  },
  body: file
});
```

---

## 🔗 Korak 7: Ažuriraj JSON Datoteku

Nakon uploada, ažuriraj URL-ove u `docs/couples-templates-database.json`:

```json
{
  "url": "https://lovestories-cdn.b-cdn.net/template-01/vintage-1920s-1.jpg",
  "thumbnail": "https://lovestories-cdn.b-cdn.net/template-01/thumbs/vintage-1920s-1-thumb.jpg"
}
```

**Format URL-a:**
- CDN URL: `https://lovestories-cdn.b-cdn.net/`
- + Putanja: `template-01/vintage-1920s-1.jpg`
- = Full URL: `https://lovestories-cdn.b-cdn.net/template-01/vintage-1920s-1.jpg`

---

## 📝 Korak 8: Struktura Foldera

Preporučena struktura u Bunny.net Storage:

```
lovestories-examples/
├── template-01/
│   ├── vintage-1920s-1.jpg
│   ├── vintage-1920s-2.jpg
│   ├── vintage-1920s-1.mp4
│   └── thumbs/
│       ├── vintage-1920s-1-thumb.jpg
│       ├── vintage-1920s-2-thumb.jpg
│       └── vintage-1920s-1-video-thumb.jpg
├── template-02/
│   └── ...
└── ...
```

---

## 🔐 Korak 9: Security (Opciono)

### Token Authentication (Za zaštićene fileove):

1. **Pull Zone → Security**
2. **Enable Token Authentication**
3. **Postavi Token Key**
4. **Generiraj signed URLs** za zaštićene fileove

**Primjer signed URL:**
```
https://lovestories-cdn.b-cdn.net/file.jpg?token=generated-token
```

---

## ✅ Checklist

- [ ] Bunny.net account kreiran
- [ ] Storage Zone kreiran
- [ ] API Key generiran i spremljen
- [ ] Pull Zone (CDN) kreiran
- [ ] CDN URL zabilježen
- [ ] Primjeri uploadani
- [ ] JSON datoteka ažurirana s novim URL-ovima
- [ ] Testirao da se primjeri učitavaju

---

## 🧪 Testiranje

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

## 💡 Savjeti

1. **Koristi thumbnails** - manje fileovi = brže učitavanje
2. **Optimiziraj slike** - kompresiraj prije uploada
3. **Koristi CDN URL** - ne direktno storage URL
4. **Cache headers** - postavi pravilno u Pull Zone settings

---

## 🔗 Korisni Linkovi

- Bunny.net Dashboard: https://bunny.net/dashboard
- Bunny.net Docs: https://docs.bunny.net
- Storage API: https://docs.bunny.net/reference/storage-api
- Pull Zone API: https://docs.bunny.net/reference/pull-zone-api

---

## 🆘 Troubleshooting

### Problem: "Access Denied"
- Provjeri API Key
- Provjeri Storage Zone permissions

### Problem: "File not found"
- Provjeri putanju u Storage Zone
- Provjeri CDN URL format

### Problem: "Slow loading"
- Provjeri Pull Zone cache settings
- Provjeri region (koristi najbližu)

---

## 📞 Support

- Bunny.net Support: https://bunny.net/support
- Email: support@bunny.net

