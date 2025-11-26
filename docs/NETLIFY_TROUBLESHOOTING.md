# 🔧 Netlify Troubleshooting - Branch to Deploy Problem

## ❌ Problem: "Branch to deploy" je prazno i ne možeš upisati

### ✅ Rješenje 1: Provjeri da li je repo povezan

1. **Provjeri u Netlify dashboardu:**
   - Site settings → Build & deploy → Continuous Deployment
   - Trebao bi vidjeti: "Connected to GitHub"
   - Ako ne vidiš, klikni "Link repository" i ponovno poveži

2. **Refresh stranice:**
   - Ponekad Netlify treba vrijeme da učita branchove
   - Pritisni F5 ili refresh

### ✅ Rješenje 2: Ručno odaberi branch

1. **Klikni na dropdown strelicu** pored "Branch to deploy"
2. Trebao bi vidjeti listu branchova:
   - `main`
   - `master`
   - itd.
3. **Odaberi `main`** iz liste

### ✅ Rješenje 3: Provjeri GitHub repo

1. **Otvori GitHub repo:**
   https://github.com/bakatraka555/lovestories

2. **Provjeri da li vidiš branch:**
   - Klikni na "main" ili "master" dropdown gore
   - Trebao bi vidjeti branchove

3. **Ako ne vidiš branchove:**
   - Provjeri da li si pushao na GitHub:
     ```bash
     git push -u origin main
     ```

### ✅ Rješenje 4: Ponovno poveži repo

1. **U Netlify dashboardu:**
   - Site settings → Build & deploy → Continuous Deployment
   - Klikni "Disconnect repository"
   - Zatim "Link repository"
   - Odaberi GitHub i repo ponovno

2. **Nakon povezivanja:**
   - Netlify će automatski detektirati branchove
   - "Branch to deploy" bi trebao imati dropdown

### ✅ Rješenje 5: Koristi netlify.toml

Ako ništa ne pomaže, `netlify.toml` će automatski postaviti sve:

1. **Ostavi formu praznu** (ili popuni kako možeš)
2. **Klikni "Deploy site"**
3. **Netlify će učitati `netlify.toml`** i postaviti sve automatski

---

## 🔍 Provjeri Status

### Provjeri da li je sve na GitHubu:

```bash
# Provjeri remote
git remote -v

# Provjeri branchove
git branch -a

# Provjeri da li je pushan
git log --oneline -5
```

### Ako nije pushan:

```bash
git push -u origin main
```

---

## 💡 Alternativa: Ručni Deploy

Ako ništa ne radi, možeš deployati ručno:

1. **Netlify Dashboard → Deploys**
2. **"Trigger deploy" → "Deploy site"**
3. **Drag & drop cijeli folder** u Netlify
4. Netlify će deployati bez Git integracije

---

## 📞 Ako i dalje ne radi

1. **Provjeri Netlify status:** https://www.netlifystatus.com
2. **Provjeri GitHub status:** https://www.githubstatus.com
3. **Kontaktiraj Netlify support** - obično odgovaraju brzo

---

## ✅ Checklist

- [ ] GitHub repo postoji i ima branchove
- [ ] Branch je pushan na GitHub (`git push`)
- [ ] Netlify je povezan s GitHub repo
- [ ] Refreshao si Netlify dashboard
- [ ] Pokušao si odabrati branch iz dropdowna
- [ ] Provjerio si `netlify.toml` postoji u repo

