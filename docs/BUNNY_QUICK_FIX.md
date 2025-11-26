# 🔧 Bunny.net Pull Zone - Brza Ispravka

## ❌ Problem u Tvojoj Konfiguraciji

Vidim da imaš:
- ✅ Origin URL: `https://lovestories-examples.bunnycdn.com/` - **ISPRAVNO**
- ❌ Origin type: "Origin URL" - **TREBA BITI "Storage Zone"**
- ❌ Host header: `https://lovestories-cdn.b-cdn.net` - **TREBA BITI PRAZNO**

---

## ✅ Ispravna Konfiguracija

### Ako koristiš Storage Zone (što je slučaj):

1. **Origin type:** Odaberi **"Storage Zone"** (ne "Origin URL"!)
2. **Storage Zone:** Odaberi `lovestories-examples` iz dropdowna
3. **Host header:** Ostavi **PRAZNO** (obriši `https://lovestories-cdn.b-cdn.net`)
4. **Cache Expiry:** 30 dana (ili default)
5. **Klikni "Add Pull Zone"**

---

## 📝 Objašnjenje

### Zašto "Storage Zone" a ne "Origin URL"?

- **"Storage Zone"** = direktna integracija s Bunny.net Storage
  - Brže
  - Jednostavnije
  - Automatski optimizirano
  
- **"Origin URL"** = vanjski server (npr. tvoj web server)
  - Sporije
  - Zahtijeva vanjski server
  - Ne koristi se za Storage Zone

### Zašto Host header treba biti prazan?

- Host header se koristi samo za vanjske servere
- Za Storage Zone, Bunny.net automatski postavlja header
- Ako uneseš CDN URL u Host header, može uzrokovati probleme

---

## 🔄 Ako si već kreirao Pull Zone

1. **Otvori Pull Zone settings**
2. **Klikni "Edit"**
3. **Promijeni:**
   - Origin type → "Storage Zone"
   - Storage Zone → odaberi svoj
   - Host header → obriši (ostavi prazno)
4. **Save**

---

## ✅ Nakon Ispravke

Pull Zone bi trebao raditi i možeš koristiti:
- CDN URL: `https://lovestories-cdn.b-cdn.net/template-01/image.jpg`

Testiraj otvaranjem URL-a direktno u browseru!

