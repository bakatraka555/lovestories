# 🔄 Vodič za Osvježavanje Cache-a (Bunny.net Slike)

## Problem
Nakon što uploadaš prave slike na Bunny.net, browser i CDN cache mogu još uvijek prikazivati stare placeholder slike.

---

## ✅ Rješenja (Pokušaj redom)

### 1. **Hard Refresh u Browseru** (Najbrže)
- **Windows/Linux:** `Ctrl + F5` ili `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`
- **Mobile:** Obriši cache u browser postavkama

### 2. **Purge Bunny.net CDN Cache**
1. Idi na [Bunny.net Dashboard](https://bunny.net)
2. Otvori **Storage** → Tvoj storage zone
3. Pronađi fajlove koji se ne osvježavaju
4. Klikni na fajl → **Purge Cache** (ako postoji opcija)

**Ili preko API-a:**
```bash
# Purge specific file
curl -X POST "https://api.bunny.net/purge?url=https://examples.b-cdn.net/temp/template-01/vintage-1920s-1.jpg" \
  -H "AccessKey: YOUR_API_KEY"
```

### 3. **Dodaj Cache-Busting Parametar** (Automatski)
Ažuriraj `museum-kiosk.html` da automatski dodaje cache-busting parametar:

```javascript
// Dodaj ovo u updatePreview funkciju
const cacheBuster = new Date().getTime(); // ili koristi verziju iz JSON-a
const imageUrl = `${image.url}?v=${cacheBuster}`;
```

### 4. **Osvježi JSON Fajl**
Ažuriraj `lastUpdated` u `couples-templates-database.json`:
```json
{
  "version": "1.3",
  "lastUpdated": "2025-01-XX",  // Ažuriraj datum
  ...
}
```

### 5. **Provjeri da su Fajlovi Stvarno Uploadani**
1. Otvori direktan URL slike u novom tabu:
   ```
   https://examples.b-cdn.net/temp/template-01/vintage-1920s-1.jpg
   ```
2. Ako vidiš placeholder → fajl nije uploadan ili je na krivoj putanji
3. Ako vidiš pravu sliku → problem je u cache-u

---

## 🔧 Automatsko Rješenje: Cache-Busting

Ako želiš automatski osvježavati slike, mogu dodati cache-busting parametar u kod.

**Opcija A: Koristi verziju iz JSON-a**
```javascript
const imageUrl = `${image.url}?v=${templatesDB.version || Date.now()}`;
```

**Opcija B: Koristi timestamp**
```javascript
const imageUrl = `${image.url}?t=${Date.now()}`;
```

**Opcija C: Koristi hash fajla** (najbolje, ali zahtijeva backend)

---

## 📋 Checklist za Upload

- [ ] Uploadao si prave slike na Bunny.net u ispravne foldere
- [ ] Provjerio si da su URL-ovi u JSON-u točni
- [ ] Napravio si hard refresh u browseru (Ctrl+F5)
- [ ] Provjerio si direktan URL slike u novom tabu
- [ ] Purge-ao si CDN cache ako je potrebno

---

## 🚨 Česti Problemi

### Problem: "Neke slike se osvježe, neke ne"
**Rješenje:** 
- Provjeri da su sve slike uploadane na ispravne putanje
- Provjeri da imena fajlova u JSON-u odgovaraju imenima na Bunny.net

### Problem: "Slike se osvježe na jednom uređaju, ali ne na drugom"
**Rješenje:**
- Problem je u browser cache-u na tom uređaju
- Napravi hard refresh na tom uređaju

### Problem: "Slike se ne osvježe ni nakon hard refresh-a"
**Rješenje:**
- Purge CDN cache na Bunny.net
- Provjeri da su fajlovi stvarno uploadani (otvori direktan URL)

---

## 💡 Preporuka

**Najbolje rješenje:** Dodaj cache-busting parametar u kod da automatski osvježava slike kada se JSON ažurira.

