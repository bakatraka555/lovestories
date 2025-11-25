# 🚀 Vodič za Generiranje Primjera

## 📊 Brzi Pregled Troškova

**Ukupno za sve primjere: $8.46 (~€7.80)**
- 14 slika × $0.14 = $1.96
- 13 videa × $0.50 = $6.50

---

## 🔑 Korak 1: Setup Replicate API

1. **Registriraj se:** https://replicate.com
2. **Kreiraj API token:** https://replicate.com/account/api-tokens
3. **Postavi environment varijablu:**
   ```bash
   # Windows PowerShell
   $env:REPLICATE_API_TOKEN="tvoj-token-ovdje"
   
   # Windows CMD
   set REPLICATE_API_TOKEN=tvoj-token-ovdje
   
   # Linux/Mac
   export REPLICATE_API_TOKEN="tvoj-token-ovdje"
   ```

---

## 📦 Korak 2: Instaliraj Dependencies

```bash
pip install -r requirements.txt
```

---

## 🖼️ Korak 3: Pripremi Datoteke

1. **Logo:** Spremi transparentan PNG kao `logo.png` u root folderu
2. **Muško lice:** Spremi sliku muškog lica kao `male-face.jpg` u root folderu
   - Reference model - ovo lice će biti korišteno za muškog modela u svim generacijama
3. **Žensko lice:** Spremi sliku ženskog lica kao `female-face.jpg` u root folderu
   - Reference model - ovo lice će biti korišteno za ženskog modela u svim generacijama
   
**VAŽNO:** Ove dvije slike će biti konstantne kroz sve generacije - ista lica će se pojavljivati u svim templateima!

---

## 🎯 Korak 4: Odluči Kada Generirati

### Opcija A: Test Prvo (Preporučeno)
```bash
# Testiraj s 1 templateom prvo
# Ručno edituj generate-examples.py da generira samo 1 template
# Trošak: ~$0.64
```

### Opcija B: Batch Generiranje
```bash
# Generiraj sve odjednom
python generate-examples.py
# Trošak: ~$8.46
```

---

## ⚙️ Korak 5: Pokreni Generiranje

```bash
python generate-examples.py
```

Skripta će:
1. ✅ Provjeriti da li postoje potrebne datoteke
2. ✅ Tražiti potvrdu prije generiranja
3. ✅ Generirati sve slike i video primjere
4. ✅ Spremiti rezultate u `generation-results.json`

---

## 📤 Korak 6: Upload na Storage

Nakon generiranja, uploadaj rezultate na:
- **Bunny.net** (preporučeno za CDN)
- **Supabase Storage** (besplatni tier)

Ažuriraj URL-ove u `docs/couples-templates-database.json`

---

## ⚠️ Važne Napomene

1. **Logo mora biti transparentan** - bez bijele pozadine
2. **Test slika** - koristi dobru kvalitetu, jasno vidljiva lica
3. **Promptovi** - možeš ih prilagoditi u `generate-examples.py`
4. **Troškovi** - Replicate naplaćuje po korištenju, nema monthly fee

---

## 🐛 Troubleshooting

### Greška: "REPLICATE_API_TOKEN nije postavljen"
- Provjeri da li si postavio environment varijablu
- Na Windows koristi PowerShell ili CMD ovisno o skripti

### Greška: "Logo datoteka ne postoji"
- Provjeri da li je `logo.png` u root folderu
- Provjeri da li je transparentan PNG

### Greška: "Test slika ne postoji"
- Provjeri da li je `test-couple.jpg` u root folderu
- Provjeri format (JPG, PNG)

---

## 💡 Savjeti

1. **Prvo testiraj s 1 templateom** - provjeri kvalitetu prije batch generiranja
2. **Koristi dobre test slike** - bolja input = bolji output
3. **Prilagodi promptove** - svaki template može imati custom prompt
4. **Backup rezultate** - spremi `generation-results.json` negdje sigurno

---

## 📞 Support

- Replicate Docs: https://replicate.com/docs
- nano-banana-pro: https://replicate.com/google/nano-banana-pro
- kling-v2.5-turbo-pro: https://replicate.com/kwaivgi/kling-v2.5-turbo-pro

