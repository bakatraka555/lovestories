# 📁 Bunny.net Upload Structure

Ova struktura je spremna za upload na Bunny.net Storage.

## 📋 Što je Uključeno

- ✅ **Placeholder fajlovi** (glavne slike + video fajlovi)
- ✅ **13 template foldera** (template-01 do template-13)
- ✅ **Logo fajl** (logo.jpg)
- ✅ **Thumbnails se generiraju automatski** preko Bunny.net Dynamic Image API (nema potrebe za uploadom)

## 🚀 Kako Uploadati na Bunny.net

### Opcija 1: Preko Bunny.net Dashboard (Ručno)

1. Idi na: https://bunny.net/storage
2. Odaberi Storage Zone: `lovestories-examples`
3. Upload cijeli `temp/` folder strukturu:
   - Drag & drop cijeli `temp/` folder
   - Ili uploadaj folder po folder (template-01/, template-02/, itd.)
   - **VAŽNO:** Uploadaj folder strukturu, ne samo fajlove!

### Opcija 2: Preko Bunny.net API

Koristi Bunny.net Storage API za bulk upload.

## 📝 Napomene

- **Placeholder slike** su privremene - zamijeni ih pravim generiranim primjerima
- **MP4 fajlovi** su prazni placeholderi - zamijeni ih pravim video fajlovima
- **Logo** je placeholder - zamijeni ga pravim logo fajlom (transparent PNG preporučen)
- **Struktura** mora biti identična - ne mijenjaj imena foldera ili fajlova
- **Thumbnails se generiraju automatski** preko Bunny.net Dynamic Image API
  - Format: `image.jpg?width=200&height=200&aspect_ratio=1:1`
  - Nema potrebe za uploadom thumbnails fajlova
  - Aktiviraj Bunny Optimizer + Dynamic Image API u Bunny.net Dashboardu
  - Vidi: `docs/BUNNY_DYNAMIC_IMAGE_API.md`

## 📊 Struktura

```
temp/
├── logo.jpg                          # Logo (zamijeni s pravim)
├── template-01/
│   ├── vintage-1920s-1.jpg           # Glavna slika 1
│   ├── vintage-1920s-2.jpg           # Glavna slika 2
│   └── vintage-1920s-1.mp4           # Video (zamijeni s pravim)
├── template-02/
│   ├── medieval-romance-1.jpg
│   └── medieval-romance-1.mp4
...
└── template-13/
    └── ...

Note: Thumbnails se NE uploadaju - generiraju se automatski preko:
     image.jpg?width=200&height=200&aspect_ratio=1:1
```

## ✅ Checklist Prije Uploada

- [ ] Zamijenio sve placeholder slike s pravim primjerima
- [ ] Zamijenio sve MP4 fajlove s pravim video fajlovima
- [ ] Zamijenio logo.jpg s pravim logo fajlom
- [ ] Provjerio da su svi fajlovi u ispravnim folderima
- [ ] Provjerio da su imena fajlova točna (prema BUNNY_UPLOAD_CHECKLIST.md)
- [ ] Aktivirao Bunny Optimizer + Dynamic Image API u Bunny.net Dashboardu
- [ ] **Nema potrebe za uploadom thumbnails** - generiraju se automatski

## 🔗 Korisni Linkovi

- Bunny.net Dashboard: https://bunny.net/dashboard
- Storage Zone: https://bunny.net/storage
- Upload Checklist: `../docs/BUNNY_UPLOAD_CHECKLIST.md`

