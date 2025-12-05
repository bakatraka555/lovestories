# ⚡ Brzo Rješenje za Cache Problem

## ✅ Što sam napravio:

1. **Dodao automatski cache-busting** u `museum-kiosk.html`
   - Slike sada automatski dobivaju parametar `?v=1.4` u URL-u
   - Kada ažuriraš verziju u JSON-u, sve slike će se automatski osvježiti

2. **Ažurirao verziju** u `couples-templates-database.json` na `1.4`

---

## 🔄 Kako osvježiti slike SADA:

### Opcija 1: Hard Refresh (Najbrže)
- **Windows:** `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`
- **Mobile:** Obriši cache u browser postavkama

### Opcija 2: Purge Bunny.net Cache
1. Idi na [Bunny.net Dashboard](https://bunny.net)
2. Storage → Tvoj storage zone
3. Pronađi fajlove koji se ne osvježavaju
4. Obriši ih i uploadaj ponovno (ili purge cache ako postoji opcija)

### Opcija 3: Provjeri Direktan URL
Otvori direktan URL slike u novom tabu:
```
https://examples.b-cdn.net/temp/template-01/vintage-1920s-1.jpg
```

- ✅ Ako vidiš **pravu sliku** → problem je u browser cache-u (napravi hard refresh)
- ❌ Ako vidiš **placeholder** → fajl nije uploadan ili je na krivoj putanji

---

## 📝 Kako osvježiti slike U BUDUĆNOSTI:

Kada uploadaš nove slike na Bunny.net:

1. **Ažuriraj verziju** u `couples-templates-database.json`:
   ```json
   {
     "version": "1.5",  // Povećaj verziju
     "lastUpdated": "2025-11-29"  // Ažuriraj datum
   }
   ```

2. **Pushaj na GitHub/Netlify** - cache će se automatski osvježiti

3. **Napravi hard refresh** u browseru (`Ctrl + F5`)

---

## 🎯 Rezultat:

- ✅ Cache-busting automatski dodaje `?v=1.4` u sve URL-ove slika
- ✅ Kada promijeniš verziju u JSON-u, sve slike će se osvježiti
- ✅ Nema potrebe za ručnim purge-om cache-a (osim ako Bunny.net ima dugi cache)

---

## ⚠️ Ako slike još uvijek ne žele:

1. Provjeri da su fajlovi uploadani na ispravne putanje
2. Provjeri da imena fajlova u JSON-u odgovaraju imenima na Bunny.net
3. Purge CDN cache na Bunny.net (ako postoji opcija)
4. Probaj u incognito/private mode (za provjeru cache-a)

