# 💑 Love Stories Museum - Handover Dokument

## 📋 Projekt Pregled

**Naziv:** Love Stories Museum Photo Booth  
**Lokacija:** Dubrovnik, Hrvatska  
**Cilj:** Interaktivni photo booth za parove u muzeju koji generira romantične AI transformacije

---

## 🎯 Što Projekt Radi

### Glavna Funkcionalnost
1. **Photo Booth Interface** (`museum-kiosk.html`)
   - Tablet-friendly interface za muzej
   - Pregled 13 romantičnih templatea
   - Preview slika i videa za svaki template
   - QR kod generiranje za narudžbu

2. **Template Katalog** (`docs/couples-templates-database.json`)
   - 13 različitih romantičnih tema
   - Svaki template ima primjere slika i videa
   - Kategorizirano po stilovima (vintage, modern, fantasy, itd.)

3. **AI Generiranje**
   - **Model za slike:** `google/nano-banana-pro` ($0.14/slika)
   - **Model za video:** `kwaivgi/kling-v2.5-turbo-pro` ($0.50/video)
   - **API:** Replicate API
   - **Workflow:** Upload slike → AI transformacija → Download

---

## 📁 File Struktura

### Fileovi u `lovestories dubrovnik` folderu:

```
lovestories dubrovnik/
├── museum-kiosk.html          # Photo booth interface za tablet
├── docs/
│   └── couples-templates-database.json  # 13 templatea sa primjerima
└── LOVESTORIES_HANDOVER.md     # Ovaj dokument
```

### Fileovi koji OSTAJU u `raincrest.art` folderu:
- Sve vezano za **King/Queen** (GoT teme)
- `index.html` - glavna stranica za GoT
- `docs/scene-catalog.md` - GoT scene
- Workflow skripte za GoT

---

## 🎨 13 Romantičnih Templatea

1. **Vintage Romance (1920s)** - Par u vintage stilu
2. **Medieval Romance** - Kralj i kraljica u Dubrovniku
3. **Beach Sunset** - Romantičan zalazak sunca
4. **City Lights** - Noćni grad s bokeh efektom
5. **Garden Wedding** - Vjenčanje u vrtu
6. **Casino Glamour** - Poker partija, elegantno
7. **Chibi 3D** - 3D chibi karakteri
8. **Trading Card Style** - Trading card dizajn
9. **Dubrovnik Sunrise** - Zora u Dubrovniku
10. **Volcano Adventure** - 3D big head caricature
11. **Instagram Frame** - Social media stil
12. **Forever Together Box** - 3D collectible figure
13. **Cinematic Travel** - Putnička fotografija

---

## 🔧 Tehnologija

### Image Generation
- **Model:** `google/nano-banana-pro`
- **Cijena:** $0.14 po slici
- **Karakteristike:**
  - Odlična integracija lica
  - Prepoznatljivost karaktera
  - Podrška za parove (2 lica)
  - Logo integracija

### Video Generation
- **Model:** `kwaivgi/kling-v2.5-turbo-pro`
- **Cijena:** $0.50 po videu (5 sekundi)
- **Karakteristike:**
  - Prirodan pokret
  - Visoka kvaliteta
  - Cinematic stil

### API Integration
- **Replicate API** - glavni provider
- **Storage:** Bunny.net ili Supabase Storage
- **CDN:** Bunny.net za brzu dostavu

---

## 📱 Photo Booth Interface

### Funkcionalnosti:
1. **Template Selector** (lijevo)
   - Lista svih 13 templatea
   - Klik na template prikazuje primjere

2. **Preview Area** (desno)
   - Primjeri slika (gallery)
   - Primjeri videa (playable)
   - Responsive za tablet

3. **Order Section** (dolje)
   - QR kod generiranje
   - Link za narudžbu na mobitelu
   - Automatski refresh svakih 30 sekundi

### Kako Koristiti:
1. Otvori `museum-kiosk.html` na tabletu
2. Korisnik odabere template
3. Vidi primjere slika/videa
4. Skenira QR kod sa svojim mobitelom
5. Preusmjeri na narudžbu stranicu

---

## 🎯 Prompt Struktura

### Osnovni Prompt Format:
```
Ultra-photorealistic, highly cinematic [STIL] photograph.

CRITICAL: INPUT IMAGE PROCESSING
- ONE image with person(s) (can be MALE or FEMALE, or COUPLE)
- ONE LOGO IMAGE (Love Stories Museum logo)

FACE RECOGNITION:
- LOAD and ANALYZE the input image(s)
- IDENTIFY the person(s) - recognize facial features
- MAINTAIN MAXIMUM RECOGNIZABILITY
- PRESERVE all distinctive facial features
- KEEP the face 100% ACCURATE from reference

LOGO INTEGRATION:
- LOAD the logo image
- REMOVE white background (make transparent)
- PLACE in BOTTOM RIGHT CORNER
- SIZE: 10-15% of image width
- OPACITY: 70-80%

[SCENA OPIS]
[LOKACIJA OPIS]
[STIL OPIS]
```

---

## 💰 Cijene

### Po Narudžbi:
- **Slika:** $0.14 (nano-banana-pro)
- **Video:** $0.50 (kling-v2.5-turbo-pro)
- **Total:** $0.64 po paru (slika + video)

### Prodajna Cijena:
- Preporučeno: €9.99 - €24.99 po paru
- Ovisno o paketu (1-3 templatea)

---

## 🚀 Sljedeći Koraci

### 1. Setup Photo Booth
- [ ] Postavi tablet u muzej
- [ ] Otvori `museum-kiosk.html` u browseru
- [ ] Testiraj QR kod generiranje
- [ ] Provjeri da se primjeri učitavaju

### 2. Upload Primjere
- [ ] Generiraj primjere za svaki od 13 templatea
- [ ] Upload na Bunny.net ili Supabase Storage
- [ ] Ažuriraj URL-ove u `couples-templates-database.json`

### 3. Integracija Narudžbe
- [ ] Spoji QR kod sa narudžbom stranicom
- [ ] Setup Replicate API
- [ ] Testiraj cijeli workflow

### 4. Marketing
- [ ] Pripremi before/after slike
- [ ] Postavi QR kodove u muzeju
- [ ] Educiraj osoblje

---

## 📞 Kontakt & Support

### API Keys Potrebni:
- Replicate API token
- Bunny.net API (opciono)
- Supabase keys (opciono)

### Dokumentacija:
- Replicate: https://replicate.com/docs
- nano-banana-pro: https://replicate.com/google/nano-banana-pro
- kling-v2.5-turbo-pro: https://replicate.com/kwaivgi/kling-v2.5-turbo-pro

---

## ⚠️ Važne Napomene

1. **Logo:** Logo mora biti transparentan (bez bijele pozadine)
2. **Face Recognition:** nano-banana-pro odlično prepoznaje lica, ali uvijek testiraj
3. **Parovi:** Model može primiti 2 odvojene slike lica ili 1 sliku s parom
4. **QR Kod:** Automatski se refreshuje svakih 30 sekundi
5. **Storage:** Preporučeno koristiti CDN za brže učitavanje primjera

---

## 🎨 Brand Guidelines

### Logo:
- **Pozicija:** Bottom right corner
- **Veličina:** 10-15% širine slike
- **Opacity:** 70-80%
- **Format:** PNG s transparentnom pozadinom

### Boje:
- Romantične, tople nijanse
- Zlatne akcente za premium feel
- Meke, pastelne boje za vintage teme

### Stil:
- Cinematic, visoka kvaliteta
- Emotivno, romantično
- Profesionalno, ali pristupačno

---

## ✅ Checklist za Launch

- [ ] Photo booth interface funkcionalan
- [ ] Svi 13 templatea imaju primjere
- [ ] QR kod generiranje radi
- [ ] Replicate API setup
- [ ] Storage/CDN setup
- [ ] Test narudžba prošla
- [ ] Logo transparentan i postavljen
- [ ] Tablet optimizacija provjerena
- [ ] Osoblje educirano

---

**Datum Kreiranja:** 2025-01-25  
**Verzija:** 1.0  
**Status:** Ready for Setup

