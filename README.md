# 💑 Love Stories Museum - Photo Booth

Interaktivni photo booth za parove u Love Stories Museum, Dubrovnik.

## 🎯 Što je ovo?

Photo booth aplikacija koja omogućava parovima da odaberu romantične AI transformacije. Korisnici biraju template, vide primjere, i skeniraju QR kod za narudžbu.

## 📁 Struktura Projekta

```
lovestories/
├── museum-kiosk.html              # Photo booth interface (tablet)
├── docs/
│   ├── couples-templates-database.json  # 13 templatea
│   ├── COST_ANALYSIS.md          # Analiza troškova
│   ├── DEPLOYMENT.md              # Deployment vodič
│   └── LOVESTORIES_HANDOVER.md    # Detaljna dokumentacija
├── generate-examples.py           # Skripta za generiranje primjera
├── requirements.txt               # Python dependencies
├── start-server.bat              # Windows server script
├── start-server.ps1              # PowerShell server script
└── README.md                      # Ovaj file
```

## 🚀 Brzi Start

### Lokalno Pokretanje

1. **Pokreni lokalni server:**
   ```bash
   # Windows
   start-server.bat
   
   # Ili PowerShell
   .\start-server.ps1
   ```

2. **Otvori u browseru:**
   ```
   http://localhost:8000/museum-kiosk.html
   ```

## 🎨 13 Romantičnih Templatea

1. Vintage Romance (1920s)
2. Medieval Romance
3. Beach Sunset
4. City Lights
5. Garden Wedding
6. Love Walks Through Time 🆕
7. Chibi 3D
8. Trading Card Style
9. Dubrovnik Sunrise
10. Volcano Adventure
11. Instagram Frame
12. Forever Together Box
13. Cinematic Travel

## 💰 Troškovi

- **Generiranje primjera:** $8.46 (14 slika + 13 videa)
- **Po narudžbi:** $0.64 (1 slika + 1 video)

Detaljno: [docs/COST_ANALYSIS.md](docs/COST_ANALYSIS.md)

## 🔧 Tehnologija

- **Frontend:** HTML, CSS, JavaScript
- **AI Generation:** Replicate API
  - Slike: `google/nano-banana-pro` ($0.14/slika)
  - Video: `kwaivgi/kling-v2.5-turbo-pro` ($0.50/video)
- **Hosting:** Netlify
- **Storage:** Bunny.net / Supabase

## 📚 Dokumentacija

- [Cost Analysis](docs/COST_ANALYSIS.md) - Detaljna analiza troškova
- [Deployment Guide](docs/DEPLOYMENT.md) - Kako deployati na Netlify
- [Handover Document](docs/LOVESTORIES_HANDOVER.md) - Kompletna dokumentacija
- [Generation Guide](README_GENERATION.md) - Kako generirati primjere

## 🔑 API Keys Potrebni

- Replicate API Token
- Netlify Account (za hosting)
- Bunny.net / Supabase (za storage primjera)

## 📞 Support

- Replicate: https://replicate.com/docs
- Netlify: https://docs.netlify.com

## 📝 License

Private project - Love Stories Museum, Dubrovnik

