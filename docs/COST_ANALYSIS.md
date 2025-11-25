# 💰 Analiza Troškova - Generiranje Primjera

## 📊 Kalkulacija za 13 Templatea

### Broj Primjera:
- **Slika:** 14 primjera (template-01 ima 2, ostali po 1)
- **Videa:** 13 primjera (svaki template ima 1 video)

### Cijene po Jedinici:
- **Slika:** $0.14 (google/nano-banana-pro)
- **Video:** $0.50 (kwaivgi/kling-v2.5-turbo-pro)

### Ukupni Troškovi:

| Tip | Količina | Cijena po jedinici | Ukupno |
|-----|----------|-------------------|--------|
| Slike | 14 | $0.14 | **$1.96** |
| Videa | 13 | $0.50 | **$6.50** |
| **TOTAL** | 27 | - | **$8.46** |

**U EUR (približno):** ~€7.80

---

## 🎯 Preporuka: Kada Otvoriti API?

### ✅ **OTVORI ODMAH** ako:
1. ✅ Imaš test slike parova spremne
2. ✅ Želiš vidjeti kvalitetu prije produkcije
3. ✅ Imaš budžet od ~$10 za testiranje
4. ✅ Želiš brzo napraviti primjere za muzej

### ⏸️ **SAČEKAJ** ako:
1. ❌ Nemaš još test slike
2. ❌ Želiš prvo testirati s 1-2 templatea
3. ❌ Čekaš finalne promptove
4. ❌ Nemaš još logo spremno

---

## 🚀 Preporučeni Pristup

### Faza 1: Testiranje (Preporučeno)
1. **Generiraj 2-3 primjera** (1 template)
   - 1 slika + 1 video = **$0.64**
   - Testiraj kvalitetu i promptove
   - Provjeri logo integraciju

2. **Ako je kvaliteta dobra → Faza 2**

### Faza 2: Batch Generiranje
1. **Generiraj sve primjere odjednom**
   - Ukupno: **$8.46**
   - Upload na Bunny.net/Supabase
   - Ažuriraj JSON datoteku

---

## 🔑 API Keys Potrebni

### Obavezno:
- ✅ **Replicate API Token**
  - Registracija: https://replicate.com
  - API keys: https://replicate.com/account/api-tokens
  - Cijena: Pay-as-you-go (nema monthly fee)

### Opciono (ali preporučeno):
- 📦 **Bunny.net Storage** (za hosting primjera)
  - CDN za brže učitavanje
  - ~$1-5/mjesec ovisno o trafficu
  
- 🗄️ **Supabase Storage** (alternativa)
  - Besplatni tier: 1GB storage
  - Dovoljno za primjere

---

## 📝 Checklist Prije Generiranja

### Prije nego otvoriš API:
- [ ] Imaš test sliku para (ili 2 odvojene slike lica)
- [ ] Logo je spreman (transparentan PNG)
- [ ] Promptovi su finalizirani za svaki template
- [ ] Replicate account je kreiran
- [ ] API token je generiran
- [ ] Imaš plan gdje ćeš hostati primjere (Bunny.net/Supabase)

### Prije batch generiranja:
- [ ] Testirao si 1-2 primjera i kvaliteta je dobra
- [ ] Logo integracija radi kako treba
- [ ] Face recognition radi dobro
- [ ] Imaš backup plan ako nešto ne radi

---

## 💡 Savjeti za Uštedu

1. **Generiraj prvo thumbnails** (manje rezolucije) za testiranje
2. **Koristi batch processing** - generiraj sve odjednom
3. **Provjeri Replicate credits** - možda imaš free credits
4. **Koristi Supabase free tier** za početak (1GB je dovoljno)

---

## 🔄 Workflow

```
1. Setup Replicate API ✅
   ↓
2. Test s 1 templateom ($0.64)
   ↓
3. Ako OK → Generiraj sve ($8.46)
   ↓
4. Upload na storage
   ↓
5. Ažuriraj JSON datoteku
   ↓
6. Testiraj u muzeju
```

---

## 📞 Support

- Replicate Docs: https://replicate.com/docs
- nano-banana-pro: https://replicate.com/google/nano-banana-pro
- kling-v2.5-turbo-pro: https://replicate.com/kwaivgi/kling-v2.5-turbo-pro

