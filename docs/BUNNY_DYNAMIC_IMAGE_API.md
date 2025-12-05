# 🖼️ Bunny.net Dynamic Image API

⚠️ **NAPOMENA:** Bunny Optimizer je **PLAĆEN** servis. Preporučujemo korištenje **besplatnog rješenja** s Netlify Function + Sharp bibliotekom. Vidi: `docs/THUMBNAILS_FREE_SOLUTION.md`

## 📋 Automatsko Generiranje Thumbnails (Bez Netlify) - PLAĆENO

Bunny.net nudi **Dynamic Image API** koji omogućuje automatsko generiranje thumbnails direktno preko URL parametara - **bez potrebe za Netlify Functions ili ručnim uploadom thumbnails!**

---

## 🚀 Kako Funkcionira?

### URL Parametri

Dodaj parametre na kraj URL-a slike:

```
Original: https://examples.b-cdn.net/template-01/vintage-1920s-1.jpg
Thumbnail: https://examples.b-cdn.net/template-01/vintage-1920s-1.jpg?width=200&height=200&aspect_ratio=1:1
```

### Dostupni Parametri

- `width` - Širina slike (npr. 200)
- `height` - Visina slike (npr. 200)
- `aspect_ratio` - Omjer stranica (npr. 1:1, 16:9, 4:3)
- `quality` - Kvaliteta (1-100, default: 85)
- `format` - Format (jpg, png, webp)

---

## ✅ Prednosti

1. **Nema potrebe za uploadom thumbnails** - Bunny.net automatski generira
2. **Nema potrebe za Netlify Functions** - Sve se radi direktno u frontendu
3. **Manje storage prostora** - Thumbnails se ne pohranjuju, generiraju se na zahtjev
4. **Automatska optimizacija** - Bunny.net optimizira slike automatski

---

## 🔧 Kako Aktivirati?

### 1. Omogući Bunny Optimizer

1. Idi na: https://bunny.net/dashboard
2. Odaberi svoj **Pull Zone** (CDN)
3. Idi na **Optimizer** tab
4. Aktiviraj **"Turn on Bunny Optimizer"**
5. Aktiviraj **"Dynamic Image API"**

### 2. Koristi u Kodu

Frontend automatski generira thumbnail URL:

```javascript
// Ako thumbnail ne postoji u JSON-u, koristi Dynamic Image API
const thumbnailUrl = image.thumbnail || `${image.url}?width=200&height=200&aspect_ratio=1:1`;
```

**Lokacija:** `museum-kiosk.html` (ažurirano)

---

## 📝 Primjeri

### Thumbnail (200x200, kvadrat)

```
https://examples.b-cdn.net/template-01/vintage-1920s-1.jpg?width=200&height=200&aspect_ratio=1:1
```

### Medium Size (800x600)

```
https://examples.b-cdn.net/template-01/vintage-1920s-1.jpg?width=800&height=600&aspect_ratio=4:3
```

### WebP Format (manji file size)

```
https://examples.b-cdn.net/template-01/vintage-1920s-1.jpg?width=200&height=200&format=webp
```

---

## ⚠️ Napomene

1. **Bunny Optimizer mora biti aktivan** - Provjeri u Bunny.net Dashboardu
2. **Prvi zahtjev može biti sporiji** - Bunny.net generira thumbnail prvi put
3. **Cache** - Generirani thumbnails se cache-aju, pa su sljedeći zahtjevi brzi
4. **Storage** - Thumbnails se ne pohranjuju na Storage, samo se generiraju na zahtjev

---

## 🔄 Migracija

### Prije (Ručni Upload Thumbnails)

```
template-01/
├── vintage-1920s-1.jpg          # Glavna slika
└── thumbs/
    └── vintage-1920s-1-thumb.jpg # Ručno uploadan thumbnail
```

### Sada (Dynamic Image API)

```
template-01/
└── vintage-1920s-1.jpg          # Samo glavna slika
                                   # Thumbnail se generira automatski preko URL-a
```

---

## 🔗 Korisni Linkovi

- Bunny.net Dashboard: https://bunny.net/dashboard
- Optimizer Settings: https://bunny.net/cdn
- Dynamic Image API Docs: https://docs.bunny.net/docs/stream-image-processing

---

## ✅ Što je Ažurirano?

1. **`museum-kiosk.html`** - Koristi Dynamic Image API za automatsko generiranje thumbnails
2. **Nema potrebe za `upload-to-bunny.js` thumbnail generiranjem** - Možeš ostaviti ili ukloniti
3. **Nema potrebe za ručnim uploadom thumbnails** - Sve se radi automatski

---

## 🎯 Rezultat

- ✅ **Samo uploadaj glavne slike** na Bunny.net
- ✅ **Thumbnails se generiraju automatski** preko Dynamic Image API
- ✅ **Nema potrebe za Netlify Functions** ili ručnim uploadom
- ✅ **Manje storage prostora** - thumbnails se ne pohranjuju

