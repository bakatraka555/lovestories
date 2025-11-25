# 🌐 Netlify Setup - Detaljni Vodič

## 📋 Postavke u Netlify Dashboardu

Kada povežeš GitHub repo s Netlify, vidićeš formu za postavke. Evo kako je popuniti:

---

## 🔧 Build & Deploy Settings

### 1. **Branch to deploy**
```
main
```
*(Ili `master` ako koristiš master branch)*

### 2. **Base directory**
```
(prazno - ostavi prazno)
```
*Root folder je već pravi, ne treba base directory*

### 3. **Build command**
```
(prazno - ostavi prazno)
```
*Statički site, nema build procesa*

### 4. **Publish directory**
```
.
```
*(Točka = root folder)*

### 5. **Functions directory**
```
netlify/functions
```
*(Opciono - ako planiraš dodati serverless funkcije)*

---

## ✅ Alternativa: Korištenje netlify.toml

Ako koristiš `netlify.toml` file (koji sam kreirao), Netlify će automatski učitati postavke iz tog filea. U tom slučaju:

**Možeš ostaviti sve prazno u formi** - Netlify će koristiti `netlify.toml`!

---

## 🔑 Environment Variables

**VAŽNO:** Postavi environment varijable u Netlify dashboardu:

1. Idi na: **Site settings → Environment variables**
2. Dodaj:
   ```
   REPLICATE_API_TOKEN = tvoj-replicate-token-ovdje
   ```

**⚠️ NE postavljaj API tokene u `netlify.toml` - samo u Netlify UI!**

---

## 📁 Struktura za Netlify Functions (Opciono)

Ako planiraš dodati serverless funkcije za `/order` stranicu:

```
lovestories/
├── netlify/
│   └── functions/
│       └── generate-image.js    # Funkcija za Replicate API
├── netlify.toml
└── ...
```

---

## 🚀 Deployment Workflow

### Prvi Put:

1. **Push na GitHub:**
   ```bash
   git push -u origin main
   ```

2. **Netlify automatski:**
   - Detektira push
   - Deploya site
   - Daje ti URL: `lovestories-dubrovnik.netlify.app`

3. **Provjeri:**
   - Otvori: `https://lovestories-dubrovnik.netlify.app`
   - Trebao bi vidjeti photo booth interface

---

## 🔄 Continuous Deployment

Nakon setupa, svaki push na `main` branch automatski deploya!

**Workflow:**
```
GitHub Push → Netlify Detektira → Build → Deploy → Live! 🎉
```

---

## 📝 Custom Domain (Opciono)

1. **Netlify Dashboard → Domain settings**
2. **Add custom domain**
3. Dodaj DNS records (A, CNAME) kako Netlify kaže
4. Netlify automatski dodaje SSL certifikat

---

## 🐛 Troubleshooting

### Problem: "Build failed"
- **Razlog:** Možda Netlify traži build command
- **Rješenje:** Ostavi build command prazno (statički site)

### Problem: "404 na /order"
- **Razlog:** `/order.html` ne postoji još
- **Rješenje:** Kreiraj `order.html` stranicu

### Problem: "Environment variables ne rade"
- **Razlog:** Možda nisu postavljene u Netlify UI
- **Rješenje:** Provjeri Site settings → Environment variables

---

## ✅ Checklist

- [ ] GitHub repo je pushan
- [ ] Netlify account kreiran
- [ ] Repo povezan s Netlify
- [ ] Build settings postavljene (ili netlify.toml)
- [ ] Environment variables postavljene
- [ ] Prvi deploy uspješan
- [ ] Site radi na netlify.app URL-u
- [ ] QR kodovi rade (testiraj)

---

## 🔗 Korisni Linkovi

- Netlify Dashboard: https://app.netlify.com
- Netlify Docs: https://docs.netlify.com
- Netlify Functions: https://docs.netlify.com/functions/overview/

