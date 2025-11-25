# 🚀 Deployment Vodič

## 🌐 Netlify - Da li je potreban?

### ✅ **DA, Netlify je potreban!**

U kodu se već koristi Netlify URL za QR kodove:
- `https://lovestories-dubrovnik.netlify.app/order?template=${template.id}`

---

## 📋 Što Netlify Omogućava

### 1. **Hosting Photo Booth Interface**
- `museum-kiosk.html` - tablet interface za muzej
- Statički hosting - besplatno
- Brzo učitavanje

### 2. **Order Page (Narudžba Stranica)**
- `/order` - stranica gdje korisnici uploadaju slike
- Integracija s Replicate API
- Processing narudžbi

### 3. **CDN & Performance**
- Globalni CDN za brzo učitavanje
- Automatski HTTPS
- Besplatni SSL certifikat

---

## 🔧 Setup Netlify

### Korak 1: Registracija
1. Registriraj se: https://www.netlify.com
2. Besplatni tier je dovoljan za početak

### Korak 2: Poveži GitHub Repo
1. U Netlify dashboardu: **"Add new site" → "Import an existing project"**
2. Odaberi GitHub i repo: `bakatraka555/lovestories`
3. Netlify će automatski detektirati build settings

### Korak 3: Build Settings
```
Build command: (prazno - statički site)
Publish directory: /
```

### Korak 4: Custom Domain (Opciono)
- Netlify automatski daje: `lovestories-dubrovnik.netlify.app`
- Možeš dodati custom domain ako želiš

---

## 📁 Struktura za Netlify

```
lovestories/
├── museum-kiosk.html      # Photo booth (root)
├── order.html              # Order page (treba kreirati)
├── docs/                   # Dokumentacija
├── .gitignore
└── netlify.toml           # Netlify config (opciono)
```

---

## 🔑 Environment Variables (Netlify)

U Netlify dashboardu → Site settings → Environment variables:

```
REPLICATE_API_TOKEN=your-token-here
```

**⚠️ VAŽNO:** Ne commitaj API tokene u Git!

---

## 🎯 Netlify Functions (Za Order Page)

Za `/order` stranicu koja komunicira s Replicate API, možda ćeš trebati:

### Opcija A: Netlify Functions (Serverless)
- Kreiraj `netlify/functions/` folder
- Node.js/Python funkcije za API pozive
- Besplatno: 125,000 poziva/mjesec

### Opcija B: Vanjski Backend
- Koristi drugi backend (Vercel, Railway, itd.)
- Netlify samo za frontend

---

## 📝 netlify.toml (Opciono)

Kreiraj `netlify.toml` u root folderu:

```toml
[build]
  publish = "."

[[redirects]]
  from = "/order"
  to = "/order.html"
  status = 200

[[redirects]]
  from = "/*"
  to = "/museum-kiosk.html"
  status = 200
```

---

## 🚀 Deployment Workflow

### Automatski (Preporučeno):
1. Push na GitHub `main` branch
2. Netlify automatski deploya
3. Gotovo! 🎉

### Ručno:
1. Build lokalno
2. Drag & drop folder u Netlify
3. Deploy

---

## 💰 Cijene

### Netlify Free Tier:
- ✅ 100GB bandwidth/mjesec
- ✅ 300 build minutes/mjesec
- ✅ 125,000 serverless function invocations/mjesec
- ✅ Besplatni SSL
- ✅ Custom domains

**Za ovaj projekt: Dovoljno je besplatni tier!**

---

## 🔄 Alternativa Netlify-u

Ako ne želiš Netlify, možeš koristiti:

1. **Vercel** - slično kao Netlify
2. **GitHub Pages** - besplatno, ali manje features
3. **Cloudflare Pages** - brzo, besplatno
4. **Supabase Hosting** - ako već koristiš Supabase

**Ali:** Netlify je najlakši za setup i već je u kodu! ✅

---

## 📞 Next Steps

1. ✅ GitHub repo je povezan
2. ⏳ Kreiraj Netlify account
3. ⏳ Poveži GitHub repo s Netlify
4. ⏳ Deploy prvi put
5. ⏳ Testiraj QR kodove
6. ⏳ Kreiraj `/order` stranicu

---

## 🔗 Korisni Linkovi

- Netlify: https://www.netlify.com
- Netlify Docs: https://docs.netlify.com
- Netlify Functions: https://docs.netlify.com/functions/overview/

