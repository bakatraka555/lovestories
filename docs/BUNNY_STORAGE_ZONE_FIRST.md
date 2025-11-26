# 🐰 Bunny.net - Prvo Kreiraj Storage Zone!

## ❌ Problem: "Select Storage Zone" je prazan

Ako ne vidiš ništa u dropdownu, to znači da **nemaš kreiran Storage Zone**!

---

## ✅ Rješenje: Kreiraj Storage Zone Prvo

### Korak 1: Idi na Storage

1. **U Bunny.net dashboardu:**
   - U lijevom meniju klikni **"Storage"**
   - (Ne "Pull Zones"!)

### Korak 2: Kreiraj Storage Zone

1. **Klikni "Add Storage Zone"** (ili "Create Storage Zone")

2. **Unesi podatke:**
   - **Name:** `lovestories-examples`
     - (Može biti bilo koji naziv, npr. `lovestories`, `examples`, itd.)
   - **Region:** Odaberi najbližu
     - Za Hrvatsku/EU: **"Falkenstein"** ili **"London"**
     - Za US: **"New York"** ili **"Los Angeles"**
   - **Replication:** Opciono (za backup)
     - Možeš ostaviti prazno za početak

3. **Klikni "Add Storage Zone"** ili "Create"

4. **Zapiši podatke:**
   - **Storage Zone Name:** (npr. `lovestories-examples`)
   - **FTP Hostname:** (npr. `lovestories-examples.bunnycdn.com`)
   - **FTP Password:** (generira se automatski - zapiši ga!)

---

## ✅ Korak 3: Sada Vrati se na Pull Zone

1. **Idi na "Pull Zones"** u lijevom meniju
2. **Klikni "Add Pull Zone"**
3. **Sada bi trebao vidjeti:**
   - Origin type: **"Storage Zone"** (odaberi)
   - Storage Zone dropdown: **Trebao bi vidjeti `lovestories-examples`** ✅

---

## 🔍 Ako i Dalje Ne Vidiš Storage Zone

### Provjeri:

1. **Jesi li siguran da si kreirao Storage Zone?**
   - Idi na **Storage** u dashboardu
   - Trebao bi vidjeti listu Storage Zones
   - Ako je prazno, nisi ga kreirao!

2. **Jesi li na pravom accountu?**
   - Provjeri da si prijavljen na pravi Bunny.net account

3. **Refresh stranicu:**
   - Ponekad treba refresh da se pojavi novi Storage Zone

4. **Provjeri permissions:**
   - Ako koristiš team account, provjeri da imaš dozvole

---

## 📝 Checklist

- [ ] Kreirao Storage Zone u "Storage" sekciji
- [ ] Storage Zone ima naziv (npr. `lovestories-examples`)
- [ ] Storage Zone je vidljiv u "Storage" listi
- [ ] Vratio se na "Pull Zones"
- [ ] U "Select Storage Zone" dropdownu vidiš svoj Storage Zone

---

## 🆘 Ako i Dalje Ne Radi

1. **Logout i login ponovno** u Bunny.net
2. **Provjeri da si na pravom accountu**
3. **Kontaktiraj Bunny.net support:**
   - Email: support@bunny.net
   - Ili kroz dashboard: Help → Contact Support

---

## 💡 Alternativa: Koristi Origin URL

Ako ne možeš kreirati Storage Zone, možeš koristiti "Origin URL" opciju:

1. **Origin type:** Odaberi **"Origin URL"**
2. **Origin URL:** Unesi URL gdje ćeš hostati fileove
   - (Ali ovo zahtijeva vanjski server)

**Ali preporučeno je koristiti Storage Zone!**

