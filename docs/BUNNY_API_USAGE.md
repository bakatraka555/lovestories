# 🐰 Bunny.net API - Kako Se Koristi

## ❓ Gdje Se Koristi Bunny.net API Key?

**Bunny.net API Key NE ide u Netlify!**

Koristi se **direktno** za:
- Upload fileova na Bunny.net Storage (preko API-ja)
- Programski pristup Storage Zone-u
- Automatizacija upload procesa

---

## 🔑 Gdje Se Nalazi API Key?

1. **U Bunny.net dashboardu:**
   - Idi na **"Account"** (gore desno, klikni na profil)
   - Klikni **"API Keys"** ili **"API"**
   - Ili direktno: https://bunny.net/dashboard/account/api-keys

2. **Generiraj API Key:**
   - Klikni **"Generate API Key"**
   - Unesi naziv (npr. "lovestories-upload")
   - Zapiši API Key (vidljiv samo jednom!)

---

## 📤 Kako Se Koristi za Upload?

### Opcija 1: Preko Dashboard (Bez API Key-a)

**Najlakše - ne treba API Key:**
1. Storage → lovestories-examples
2. Klikni "Upload"
3. Uploadaj fileove

### Opcija 2: Preko FTP (Bez API Key-a)

**Ne treba API Key:**
- Koristi FTP client
- Host: `storage.bunnycdn.com`
- Username: `lovestories-examples`
- Password: (iz Storage Zone settings)

### Opcija 3: Preko API-ja (TREBA API Key)

**Za programski upload:**

#### JavaScript Primjer:

```javascript
const file = // tvoj file (File object)
const fileName = 'template-01/vintage-1920s-1.jpg';
const storageZone = 'lovestories-examples';
const apiKey = 'tvoj-bunny-api-key';

// Upload file
const response = await fetch(
  `https://storage.bunnycdn.com/${storageZone}/${fileName}`,
  {
    method: 'PUT',
    headers: {
      'AccessKey': apiKey,
      'Content-Type': file.type
    },
    body: file
  }
);

if (response.ok) {
  console.log('File uploaded successfully!');
} else {
  console.error('Upload failed:', response.statusText);
}
```

#### Python Primjer:

```python
import requests

storage_zone = 'lovestories-examples'
api_key = 'tvoj-bunny-api-key'
file_path = 'template-01/vintage-1920s-1.jpg'

with open(file_path, 'rb') as f:
    response = requests.put(
        f'https://storage.bunnycdn.com/{storage_zone}/{file_path}',
        headers={'AccessKey': api_key},
        data=f
    )
    
if response.status_code == 201:
    print('File uploaded successfully!')
```

---

## 🔐 Gdje Spremiti API Key?

### Lokalno (Za Development):

**Ne commitaj u Git!**

```bash
# .env file (dodaj u .gitignore)
BUNNY_STORAGE_ZONE=lovestories-examples
BUNNY_API_KEY=tvoj-api-key-ovdje
```

### U Kodu:

```javascript
// config.js (ne commitaj!)
export const BUNNY_CONFIG = {
  storageZone: 'lovestories-examples',
  apiKey: process.env.BUNNY_API_KEY // ili direktno za test
};
```

### U Netlify Functions (Ako Trebaš):

Ako želiš uploadati fileove preko Netlify Function:

1. **Dodaj u Netlify Environment Variables:**
   - Key: `BUNNY_API_KEY`
   - Value: Tvoj Bunny.net API Key

2. **U Netlify Function:**
```javascript
// netlify/functions/upload-to-bunny.js
exports.handler = async (event, context) => {
  const apiKey = process.env.BUNNY_API_KEY;
  const storageZone = 'lovestories-examples';
  
  // Upload file na Bunny.net
  // ...
};
```

**Ali:** Obično ne trebaš Netlify Function za Bunny.net upload - možeš direktno iz frontenda ili lokalne skripte!

---

## 📋 Kada Koristiti API Key?

### ✅ Koristi API Key za:
- Programski upload (JavaScript, Python, itd.)
- Automatizacija upload procesa
- Batch upload fileova
- Integracija u build proces

### ❌ Ne Treba API Key za:
- Upload preko dashboarda (najlakše)
- Upload preko FTP (koristi FTP password)
- Pristup fileovima preko CDN (javno dostupno)

---

## 🧪 Test API Key-a

```bash
# Test upload preko cURL
curl -X PUT \
  "https://storage.bunnycdn.com/lovestories-examples/test.jpg" \
  -H "AccessKey: tvoj-api-key" \
  --data-binary "@test.jpg"
```

---

## 🔗 Korisni Linkovi

- **Bunny.net API Keys:** https://bunny.net/dashboard/account/api-keys
- **Storage API Docs:** https://docs.bunny.net/reference/storage-api
- **Storage API Examples:** https://docs.bunny.net/reference/storage-api-put

---

## 💡 Preporuka

**Za početak:**
- Koristi **dashboard upload** (najlakše, ne treba API Key)
- Ili **FTP upload** (jednostavno, ne treba API Key)

**Kasnije:**
- Ako trebaš automatizaciju, koristi **API upload** (treba API Key)

---

## 🆘 Troubleshooting

### Problem: "AccessKey is invalid"

**Rješenje:**
1. Provjeri da si kopirao cijeli API Key
2. Provjeri da je API Key aktivan u Bunny.net dashboardu
3. Provjeri da koristiš `AccessKey` header (ne `Authorization`)

### Problem: "Storage Zone not found"

**Rješenje:**
1. Provjeri da je Storage Zone name točan
2. Provjeri da imaš dozvole za taj Storage Zone
3. Provjeri da si na pravom accountu

