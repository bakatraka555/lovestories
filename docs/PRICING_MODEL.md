# 💰 Cjenovni Model - Love Stories Museum Photo Booth

## 📊 Troškovi po Generiranju

### Varijabilni troškovi (po slici):
| Stavka | Cijena (USD) | Cijena (EUR) |
|--------|-------------|--------------|
| Replicate API (slika) | $0.14 | ~€0.13 |
| Bunny.net storage/transfer | ~$0.01 | ~€0.01 |
| **Ukupno po slici** | **$0.15** | **~€0.14** |

### Fiksni mjesečni troškovi:
| Stavka | Cijena/mjesec |
|--------|---------------|
| Bunny.net (storage + CDN) | ~€5 |
| Netlify (free tier) | €0 |
| Domena (godišnje/12) | ~€1 |
| **Ukupno fiksno** | **~€6/mjesec** |

---

## 💶 Prijedlog Cijena za Korisnike

### Opcija A: Premium Cijena (Turistička lokacija)
| Paket | Cijena (s PDV) | Bez PDV | PDV (25%) |
|-------|---------------|---------|-----------|
| 1 slika | **€5.00** | €4.00 | €1.00 |
| 3 slike | **€12.00** | €9.60 | €2.40 |
| 5 slika | **€18.00** | €14.40 | €3.60 |

### Opcija B: Srednja Cijena
| Paket | Cijena (s PDV) | Bez PDV | PDV (25%) |
|-------|---------------|---------|-----------|
| 1 slika | **€3.00** | €2.40 | €0.60 |
| 3 slike | **€7.50** | €6.00 | €1.50 |
| 5 slika | **€10.00** | €8.00 | €2.00 |

### Opcija C: Pristupačna Cijena
| Paket | Cijena (s PDV) | Bez PDV | PDV (25%) |
|-------|---------------|---------|-----------|
| 1 slika | **€2.00** | €1.60 | €0.40 |
| 3 slike | **€5.00** | €4.00 | €1.00 |
| 5 slika | **€7.50** | €6.00 | €1.50 |

---

## 🤝 Podjela Prihoda s Muzejom

### Model 1: Fiksni postotak
| Strana | Postotak | Od €5 slike |
|--------|----------|-------------|
| Muzej | 40% | €2.00 |
| TapTheMap | 60% | €3.00 |

**TapTheMap pokriva:** PDV, troškove API-ja, maintenance

### Model 2: Nakon pokrića troškova
| Korak | Iznos |
|-------|-------|
| Cijena slike | €5.00 |
| - PDV (25%) | -€1.00 |
| - Trošak API (~€0.14) | -€0.14 |
| **Neto za podjelu** | **€3.86** |
| Muzej (50%) | €1.93 |
| TapTheMap (50%) | €1.93 |

### Model 3: Najam + Provizija
| Stavka | Iznos |
|--------|-------|
| Mjesečni najam za muzej | €50-100 |
| + Provizija po slici | 20% od neto |

---

## 📈 Projekcije Prihoda

### Pretpostavke:
- Cijena: €5 po slici (opcija A)
- Dnevno posjetitelja muzeja: 200
- Konverzija: 5% koristi photo booth
- Prosječno slika po korisniku: 1.5

### Dnevni promet:
| Metrika | Vrijednost |
|---------|------------|
| Posjetitelji | 200 |
| Korisnika photo bootha | 10 (5%) |
| Slika generiranih | 15 |
| **Dnevni prihod** | **€75** |

### Mjesečni promet (26 radnih dana):
| Stavka | Iznos |
|--------|-------|
| Bruto prihod | €1,950 |
| - PDV (25%) | -€390 |
| - API troškovi (15 × €0.14 × 26) | -€55 |
| - Fiksni troškovi | -€6 |
| **Neto za podjelu** | **€1,499** |
| Muzej (40%) | €600 |
| TapTheMap (60%) | €899 |

### Godišnja projekcija:
| Strana | Godišnje |
|--------|----------|
| Muzej | ~€7,200 |
| TapTheMap | ~€10,800 |

---

## 🧾 PDV Obaveze

### Hrvatska (25% PDV):
- **Obveznik PDV-a:** Da, ako godišnji promet > 39.816,84 EUR
- **Prijava PDV-a:** Mjesečno ili kvartalno
- **R-1 račun:** Obavezan za fizičke osobe

### Opcije fiskalizacije:
1. **Fiskalna blagajna** - obavezna za gotovinu
2. **Online plaćanje** - jednostavnija evidencija
3. **QR kod za plaćanje** - integracija s bankom

---

## 💳 Opcije Naplate

### 1. Stripe Integration (Preporučeno)
| Prednost | Nedostatak |
|----------|------------|
| Kartice, Apple Pay, Google Pay | Provizija 1.4% + €0.25 |
| Automatska fiskalizacija | Potreban poslovni račun |
| QR kod plaćanje | Setup vrijeme |

### 2. PayPal
| Prednost | Nedostatak |
|----------|------------|
| Brz setup | Veća provizija (2.9% + €0.35) |
| Poznat korisnicima | Manje opcija plaćanja |

### 3. Kiosk s POS terminalom
| Prednost | Nedostatak |
|----------|------------|
| Gotovina + kartice | Trošak hardvera |
| Fiskalna blagajna | Maintenance |
| Offline rad | Složenija integracija |

### 4. QR kod → Web plaćanje
| Prednost | Nedostatak |
|----------|------------|
| Bez dodatnog hardvera | Ovisi o internetu |
| Korisnik plati na mobitelu | Potreban Stripe/PayPal |
| Automatska dostava slike | |

---

## 🎯 Preporučeni Model

### Za početak:

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  CIJENA: €5 po slici (s PDV)                   │
│                                                 │
│  PODJELA:                                       │
│  ├── Muzej: 40% od neto = ~€1.54/slika         │
│  └── TapTheMap: 60% od neto = ~€2.32/slika     │
│                                                 │
│  NAPLATA: Stripe (QR kod → plaćanje na mob)    │
│                                                 │
│  PDV: TapTheMap upravlja i plaća               │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Workflow plaćanja:
```
1. Korisnik skenira QR na kiosku
   ↓
2. Otvara se order.html na mobitelu
   ↓
3. Odabire paket (1/3/5 slika)
   ↓
4. Stripe Checkout → plaća
   ↓
5. Nakon plaćanja → upload slike
   ↓
6. Generiranje + dostava na email/mobitel
```

---

## 📋 Ugovor s Muzejom - Ključne Točke

### Obaveze TapTheMap:
- [ ] Instalacija i održavanje sustava
- [ ] Plaćanje PDV-a i API troškova
- [ ] Tehnička podrška
- [ ] Mjesečni izvještaji

### Obaveze Muzeja:
- [ ] Osigurati prostor za kiosk
- [ ] Osigurati internet konekciju
- [ ] Promovirati uslugu posjetiteljima
- [ ] Ne instalirati konkurentske sustave

### Trajanje:
- Početno: 6 mjeseci pilot
- Nakon toga: Godišnji ugovor s automatskim produljenjem

### Raskid:
- 30 dana pisane obavijesti
- Bez penala nakon pilot perioda

---

## 🔢 Kalkulator Profita

### Unesi svoje pretpostavke:

```javascript
// Promijeni ove vrijednosti
const cijenaPoSlici = 5.00;        // EUR s PDV
const slikaDnevno = 15;            // prosječno
const radnihDana = 26;             // mjesečno
const postotakMuzej = 0.40;        // 40%
const pdvStopa = 0.25;             // 25%
const apiTrosak = 0.14;            // EUR po slici

// Izračun
const mjesecnoSlika = slikaDnevno * radnihDana;
const brutoMjesecno = mjesecnoSlika * cijenaPoSlici;
const pdv = brutoMjesecno * (pdvStopa / (1 + pdvStopa));
const apiUkupno = mjesecnoSlika * apiTrosak;
const neto = brutoMjesecno - pdv - apiUkupno;
const muzejUdio = neto * postotakMuzej;
const ttmUdio = neto * (1 - postotakMuzej);

console.log(`Mjesečno slika: ${mjesecnoSlika}`);
console.log(`Bruto: €${brutoMjesecno}`);
console.log(`PDV: €${pdv.toFixed(2)}`);
console.log(`API troškovi: €${apiUkupno.toFixed(2)}`);
console.log(`Neto: €${neto.toFixed(2)}`);
console.log(`Muzej (${postotakMuzej*100}%): €${muzejUdio.toFixed(2)}`);
console.log(`TapTheMap: €${ttmUdio.toFixed(2)}`);
```

---

## ✅ Sljedeći Koraci

1. [ ] Dogovoriti cijenu s muzejom (€3-5 po slici)
2. [ ] Definirati podjelu (40/60 ili 50/50)
3. [ ] Odabrati payment provider (Stripe preporučeno)
4. [ ] Pripremiti ugovor
5. [ ] Implementirati Stripe checkout
6. [ ] Testirati cijeli flow
7. [ ] Lansirati pilot program

---

## 📞 Kontakt za Pitanja

Za dodatne informacije o cjenovnom modelu ili tehničkoj implementaciji, kontaktirajte TapTheMap tim.

