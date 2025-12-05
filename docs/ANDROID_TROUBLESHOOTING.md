# 📱 Android Troubleshooting Guide

## 🐛 Problem: "error generating: undefined"

Ako dobivaš grešku "error generating: undefined" na Android mobitelu, ovo je vodič za rješavanje.

---

## 🔍 Mogući Uzroci

### 1. **Network Issues na Android-u**
- Android može imati problema s CORS-om
- Slow ili nestabilna konekcija
- Proxy ili VPN problemi

### 2. **Browser Compatibility**
- Stari Android browseri možda ne podržavaju sve JavaScript funkcije
- Chrome na Android-u može imati drugačije ponašanje

### 3. **Error Object nije Standardan**
- Na Android-u, error objekt možda nema `.message` property
- Error može biti string umjesto Error objekta

### 4. **Timeout Issues**
- Android može imati sporiju konekciju
- Netlify Functions timeout može biti problem

---

## ✅ Rješenja (Već Implementirana)

### 1. **Poboljšan Error Handling**

**Što je dodano:**
- ✅ Provjera da li error postoji
- ✅ Provjera da li error.message postoji
- ✅ Fallback na error.toString()
- ✅ Fallback na JSON.stringify(error)
- ✅ Default poruka ako ništa ne radi

**Kod:**
```javascript
let errorMessage = 'An error occurred while generating your transformation.';

if (error) {
    if (error.message && typeof error.message === 'string' && error.message.trim().length > 0) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else if (error.toString && typeof error.toString === 'function') {
        errorMessage = error.toString();
    } else {
        errorMessage = 'An unexpected error occurred. Please try again.';
    }
}
```

### 2. **Detaljno Logiranje**

**Što je dodano:**
- ✅ Logiranje error objekta
- ✅ Logiranje error tipa
- ✅ Logiranje error konstruktora
- ✅ Logiranje error keys

**Kako koristiti:**
1. Otvori Chrome na Android-u
2. Poveži mobitel na računalo (USB debugging)
3. Otvori `chrome://inspect` na računalu
4. Vidi console logs u real-time

---

## 🔧 Kako Debuggati na Android-u

### Korak 1: Remote Debugging

1. **Omogući USB Debugging:**
   - Settings → About phone → Tap "Build number" 7 puta
   - Settings → Developer options → Enable "USB debugging"

2. **Poveži na Računalo:**
   - Spoji USB kabel
   - Na računalu, otvori Chrome
   - Idi na `chrome://inspect`
   - Klikni "inspect" na svoj Android uređaj

3. **Vidi Console:**
   - Sada možeš vidjeti sve console.log poruke
   - Vidi Network tab za requestove
   - Vidi error poruke

### Korak 2: Provjeri Network Tab

1. U Chrome DevTools, otvori Network tab
2. Pronađi request na `/.netlify/functions/generate-image`
3. Provjeri:
   - Status kod
   - Response body
   - Headers

### Korak 3: Provjeri Console

Traži:
- `=== ERROR DETAILS ===`
- `Error object:`
- `Error type:`
- `Final error message:`

---

## 🛠️ Quick Fixes

### Fix 1: Provjeri Internet Konekciju

Na Android-u:
1. Provjeri da li imaš internet
2. Pokušaj s WiFi umjesto mobilnih podataka (ili obrnuto)
3. Provjeri da li VPN ili proxy blokiraju requestove

### Fix 2: Očisti Cache

1. Chrome → Settings → Privacy → Clear browsing data
2. Odaberi "Cached images and files"
3. Klikni "Clear data"

### Fix 3: Provjeri Browser

1. Pokušaj s Chrome umjesto default browsera
2. Provjeri da li je Chrome ažuriran
3. Pokušaj s Firefox ili drugim browserom

### Fix 4: Provjeri CORS

Ako vidiš CORS error u console:
- Problem je s Netlify Functions CORS headers
- Provjeri da li `generate-image.js` vraća pravilne headers

---

## 📊 Što Sada Radi

S novim error handling-om:

1. **Ako je error undefined:**
   - Korisnik vidi: "An unexpected error occurred. Please try again..."
   - Nema više "undefined" poruke

2. **Ako error nema message:**
   - Sistem pokušava izvući poruku iz error.toString()
   - Ili koristi JSON.stringify(error)
   - Ili koristi default poruku

3. **Detaljno logiranje:**
   - Sve error detalje se logiraju u console
   - Možeš vidjeti točno što se dogodilo

---

## 🎯 Sljedeći Koraci

Ako se problem nastavi:

1. **Provjeri Console Logs:**
   - Otvori remote debugging
   - Vidi što se logira u `=== ERROR DETAILS ===`

2. **Provjeri Network:**
   - Vidi da li request stiže do servera
   - Vidi da li response dolazi natrag

3. **Provjeri Netlify Logs:**
   - Netlify Dashboard → Functions → generate-image → Logs
   - Vidi da li funkcija prima request

4. **Testiraj na Desktop:**
   - Ako radi na desktop-u, problem je specifičan za Android
   - Ako ne radi ni na desktop-u, problem je općenitiji

---

## 📝 Test Checklist

- [ ] Provjeri internet konekciju
- [ ] Očisti browser cache
- [ ] Provjeri Chrome verziju (treba biti najnovija)
- [ ] Provjeri Network tab u DevTools
- [ ] Provjeri Console za error poruke
- [ ] Provjeri Netlify Functions logs
- [ ] Testiraj na desktop browseru za usporedbu

---

**Datum:** 2025-01-XX  
**Status:** ✅ Error handling poboljšan za Android

