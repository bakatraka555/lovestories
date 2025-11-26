# 🔧 Bunny.net - Storage Zone se Ne Vidi u Pull Zone

## ✅ Problem: Storage Zone je Kreiran, Ali Ne Vidi se u Dropdownu

Vidim da imaš Storage Zone `lovestories-examples` (i imaš logo.jpg u njemu), ali ga ne vidiš u Pull Zone dropdownu.

---

## 🔧 Rješenja (Pokušaj Redom)

### Rješenje 1: Refresh Stranice

1. **Refresh Pull Zone stranicu** (F5 ili Ctrl+R)
2. **Klikni na dropdown ponovno**
3. Provjeri da li se pojavio

### Rješenje 2: Zatvori i Otvori Ponovno

1. **Zatvori Pull Zone formu** (idi na neki drugi section)
2. **Vrati se na Pull Zones**
3. **Klikni "Add Pull Zone" ponovno**
4. Provjeri dropdown

### Rješenje 3: Logout/Login

1. **Logout iz Bunny.net**
2. **Login ponovno**
3. **Idi na Pull Zones → Add Pull Zone**
4. Provjeri dropdown

### Rješenje 4: Provjeri Permissions

1. **Provjeri da si na pravom accountu**
2. Ako koristiš **team account**, provjeri da imaš dozvole za Storage Zone
3. Provjeri da Storage Zone nije **archived** ili **disabled**

### Rješenje 5: Provjeri Storage Zone Status

1. **Idi na Storage → lovestories-examples**
2. **Provjeri da je Storage Zone aktivna**
3. Ako vidiš "Archived" ili "Disabled", aktiviraj ga

### Rješenje 6: Pričekaj Sinkronizaciju

1. **Ponekad treba 1-2 minute** da se Storage Zone pojavi u dropdownu
2. **Pričekaj malo** i refresh ponovno

---

## 🔍 Provjeri Storage Zone Detalje

1. **Idi na Storage → lovestories-examples**
2. **Provjeri:**
   - Da je Storage Zone **"Active"** (ne "Archived")
   - Da imaš **permissions** za taj Storage Zone
   - Da si na **pravom accountu**

---

## 💡 Alternativa: Koristi Origin URL (Privremeno)

Ako ništa ne pomaže, možeš privremeno koristiti "Origin URL":

1. **Origin type:** Odaberi **"Origin URL"**
2. **Origin URL:** Unesi Storage Zone URL
   - Format: `https://lovestories-examples.bunnycdn.com`
3. **Host header:** Ostavi **PRAZNO**
4. **Klikni "Add Pull Zone"**

**Napomena:** Ovo će raditi, ali "Storage Zone" opcija je bolja jer je direktno integrirana.

---

## 🆘 Ako Ništa Ne Pomaže

1. **Kontaktiraj Bunny.net Support:**
   - Email: support@bunny.net
   - Ili kroz dashboard: Help → Contact Support
   
2. **Objasni problem:**
   - Storage Zone `lovestories-examples` je kreiran
   - Ne vidi se u Pull Zone dropdownu
   - Screenshot problema

---

## ✅ Provjera Nakon Rješavanja

Kada se Storage Zone pojavi u dropdownu:

1. **Origin type:** "Storage Zone" ✅
2. **Storage Zone:** Odaberi `lovestories-examples` ✅
3. **Host header:** Ostavi PRAZNO ✅
4. **Klikni "Add Pull Zone"** ✅

---

## 📝 Checklist

- [ ] Refresh Pull Zone stranicu
- [ ] Zatvori i otvori Pull Zone formu
- [ ] Logout/Login u Bunny.net
- [ ] Provjeri Storage Zone status (Active?)
- [ ] Provjeri permissions
- [ ] Pričekaj 1-2 minute za sinkronizaciju
- [ ] Kontaktiraj support ako ništa ne pomaže

