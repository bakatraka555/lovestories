# 📸 Workflow - Kada Korisnici Uploadaju Slike

## 🔄 Cijeli Proces

### 1. **U Muzeju (Tablet)**
- ✅ Korisnik vidi photo booth interface
- ✅ Odabere template (npr. "Vintage Romance")
- ✅ Vidi primjere slika i videa
- ✅ Vidi QR kod

### 2. **Na Mobitelu (Korisnik)**
- ✅ Skenira QR kod sa svojim mobitelom
- ✅ Otvara se `/order?template=template-01` stranica
- ✅ **OVDJE UPLOADUJE SLIKE** 📸
- ✅ Odabere svoje slike (1 slika s parom ili 2 odvojene slike)
- ✅ Klikne "Generiraj"

### 3. **Backend Processing**
- ✅ Slike se šalju na Replicate API
- ✅ AI generira transformaciju
- ✅ Rezultat se vraća korisniku

### 4. **Rezultat**
- ✅ Korisnik vidi transformirane slike/video
- ✅ Može downloadati rezultate

---

## 📍 Gdje Se Uploadaju Slike?

**Na `/order.html` stranici!**

Trenutno:
- ❌ `/order.html` **ne postoji još**
- ✅ QR kod vodi na `/order?template=template-01`
- ✅ `netlify.toml` redirecta `/order` → `/order.html`

**Trebam kreirati `order.html` stranicu gdje korisnici uploadaju slike!**

---

## 🎯 Što Treba Kreirati

### `order.html` stranica treba:
1. **File upload** - gdje korisnik odabere slike
2. **Template info** - prikaže koji template je odabran
3. **Preview** - prikaže odabrane slike prije uploada
4. **Generate button** - pokrene AI generiranje
5. **Loading state** - prikaže progress
6. **Results** - prikaže generirane slike/video
7. **Download** - omogući download rezultata

---

## 🔧 Tehnologija

### Frontend (`order.html`):
- HTML/CSS/JavaScript
- File input za upload
- Preview slika
- API poziv na Netlify Function

### Backend (Netlify Function):
- Prima slike
- Komunicira s Replicate API
- Vraća rezultate

---

## 📝 Sljedeći Korak

**Kreirati `order.html` stranicu!**

Želiš li da kreiram `order.html` stranicu s upload funkcionalnostima?

