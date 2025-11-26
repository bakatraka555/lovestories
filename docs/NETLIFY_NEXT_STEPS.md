# ✅ Netlify - Sljedeći Koraci Nakon Povezivanja

## 🎯 Što Sada?

### 1. Provjeri Build Settings

Netlify bi trebao automatski:
- ✅ Detektirati `netlify.toml`
- ✅ Postaviti branch na `main`
- ✅ Konfigurirati sve postavke

**Ako vidiš "Branch to deploy" prazno:**
- Klikni na **dropdown strelicu** (ne upisuj ručno)
- Odaberi `main` iz liste
- Ili **ostavi prazno** - `netlify.toml` će postaviti sve

### 2. Klikni "Deploy site"

Nakon što klikneš "Deploy site":
- Netlify će početi build proces
- Vidjet ćeš progress u real-time
- Traje ~1-2 minute

### 3. Provjeri Deploy Status

Nakon deploya:
- ✅ **Success** = Site je live!
- ❌ **Failed** = Provjeri error log

### 4. Dobit ćeš URL

Netlify će automatski dati URL:
- `https://lovestories-dubrovnik.netlify.app`
- Ili sličan (može biti drugačiji)

---

## 🔑 Postavi Environment Variables

**VAŽNO:** Prije nego testiraš site, postavi API token:

1. **Site settings → Environment variables**
2. **Add variable:**
   - Key: `REPLICATE_API_TOKEN`
   - Value: `tvoj-token-ovdje`
3. **Save**

**⚠️ NE commitaj token u Git!**

---

## 🧪 Testiraj Site

1. **Otvori Netlify URL:**
   ```
   https://lovestories-dubrovnik.netlify.app
   ```

2. **Provjeri:**
   - ✅ Photo booth interface se učitava
   - ✅ Template lista se prikazuje
   - ✅ QR kodovi se generiraju

3. **Ako nešto ne radi:**
   - Provjeri browser console (F12)
   - Provjeri Netlify deploy logs

---

## 🔄 Continuous Deployment

Nakon prvog deploya:
- ✅ Svaki push na `main` = automatski deploy
- ✅ Netlify šalje email o svakom deployu
- ✅ Možeš vidjeti deploy history

---

## 📝 Checklist

- [ ] Repo povezan s Netlify
- [ ] Branch odabran (ili `netlify.toml` detektiran)
- [ ] Prvi deploy uspješan
- [ ] Environment variables postavljene
- [ ] Site radi na netlify.app URL-u
- [ ] Photo booth interface se učitava
- [ ] QR kodovi se generiraju

---

## 🐛 Ako Deploy Fails

### Provjeri Deploy Logs:
1. **Deploys → Latest deploy → View build log**
2. Traži error poruke
3. Najčešći problemi:
   - Build command ne radi (ali mi nemamo build command)
   - Missing files (provjeri da li su svi fileovi pushani)
   - Environment variables (ako koristiš u build procesu)

### Ako vidiš "Build command failed":
- To je OK - mi nemamo build command
- Netlify će deployati statički site bez problema

---

## 🎉 Gotovo!

Ako sve radi:
- ✅ Site je live
- ✅ QR kodovi vode na `/order` stranicu
- ✅ Photo booth je spreman za muzej!

**Sljedeći korak:** Kreiraj `/order.html` stranicu za narudžbe.

