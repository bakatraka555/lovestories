#!/usr/bin/env python3
"""
Skripta za generiranje jedne scene na Replicate i upload na Bunny.net

Korištenje:
1. Postavi environment varijable (REPLICATE_API_TOKEN, BUNNY_API_KEY, BUNNY_STORAGE_ZONE)
2. Pripremi male-face.jpg i female-face.jpg
3. Pokreni: python generate-and-upload-single.py template-01
"""

import os
import sys
import json
import requests
import replicate
from pathlib import Path
from urllib.parse import urlparse

# Environment varijable
REPLICATE_API_TOKEN = os.getenv('REPLICATE_API_TOKEN')
BUNNY_API_KEY = os.getenv('BUNNY_API_KEY')
BUNNY_STORAGE_ZONE = os.getenv('BUNNY_STORAGE_ZONE', 'lovestories-examples')

# Provjeri environment varijable
if not REPLICATE_API_TOKEN:
    print('❌ GREŠKA: REPLICATE_API_TOKEN nije postavljen!')
    print('Postavi ga sa: export REPLICATE_API_TOKEN="tvoj-token"')
    sys.exit(1)

if not BUNNY_API_KEY:
    print('❌ GREŠKA: BUNNY_API_KEY nije postavljen!')
    print('Postavi ga sa: export BUNNY_API_KEY="tvoj-api-key"')
    sys.exit(1)

# Inicijaliziraj Replicate client
client = replicate.Client(api_token=REPLICATE_API_TOKEN)

# Konfiguracija
IMAGE_MODEL = "google/nano-banana-pro"
LOGO_URL = "https://examples.b-cdn.net/logo.jpg"
MALE_FACE_PATH = "male-face.jpg"
FEMALE_FACE_PATH = "female-face.jpg"

# Provjeri da li postoje potrebne datoteke
if not os.path.exists(MALE_FACE_PATH):
    print(f'❌ GREŠKA: Muško lice "{MALE_FACE_PATH}" ne postoji!')
    sys.exit(1)

if not os.path.exists(FEMALE_FACE_PATH):
    print(f'❌ GREŠKA: Žensko lice "{FEMALE_FACE_PATH}" ne postoji!')
    sys.exit(1)

# Učitaj template database
with open('docs/couples-templates-database.json', 'r', encoding='utf-8') as f:
    templates_db = json.load(f)

# Template-specific prompts
PROMPTS = {
    "template-01": {
        "scene": "Romantic couple in elegant 1920s style clothing, vintage fashion, art deco aesthetic",
        "location": "Vintage setting, 1920s atmosphere, glamorous environment, period-appropriate background",
        "style": "Black and white or sepia tone, art deco style, timeless elegance, glamorous, sophisticated"
    },
    "template-02": {
        "scene": "King and queen in Dubrovnik, Game of Thrones style, majestic and regal, epic fantasy",
        "location": "Dubrovnik old town, Stradun, medieval architecture in background, Croatian landmarks visible",
        "style": "Epic fantasy, cinematic, dramatic lighting, royal atmosphere, medieval aesthetic"
    },
    "template-03": {
        "scene": "Romantic couple on beach during sunset, warm golden hour lighting, ocean waves",
        "location": "Beautiful beach, ocean waves, sunset sky, romantic beach setting",
        "style": "Warm colors, golden hour, romantic atmosphere, natural lighting, cinematic"
    }
}

def download_logo():
    """Download logo s CDN-a"""
    logo_path = "logo_temp.jpg"
    print(f"📥 Preuzimanje loga s {LOGO_URL}...")
    
    try:
        response = requests.get(LOGO_URL)
        response.raise_for_status()
        
        with open(logo_path, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ Logo preuzet: {logo_path}")
        return logo_path
    except Exception as e:
        print(f"❌ Greška pri preuzimanju loga: {e}")
        return None

def create_prompt(template_id):
    """Kreira prompt za template"""
    if template_id not in PROMPTS:
        print(f"⚠️  Template {template_id} nije u PROMPTS - koristim default")
        template_info = {
            "scene": "Romantic couple",
            "location": "Beautiful location",
            "style": "Cinematic, professional"
        }
    else:
        template_info = PROMPTS[template_id]
    
    prompt = f"""Ultra-photorealistic, highly cinematic photograph.

CRITICAL: INPUT IMAGE PROCESSING
- TWO INPUT IMAGES:
  * IMAGE 1: MALE FACE (reference model - use this face for male person)
  * IMAGE 2: FEMALE FACE (reference model - use this face for female person)
- ONE LOGO IMAGE (Love Stories Museum logo)

FACE RECOGNITION & CONSISTENCY:
- LOAD and ANALYZE both input images
- IDENTIFY the male person from IMAGE 1 - recognize ALL facial features, bone structure, distinctive characteristics
- IDENTIFY the female person from IMAGE 2 - recognize ALL facial features, bone structure, distinctive characteristics
- MAINTAIN MAXIMUM RECOGNIZABILITY for both faces across ALL generations
- PRESERVE all distinctive facial features from both reference images
- KEEP both faces 100% ACCURATE from their reference images
- DO NOT alter facial structure, bone structure, eye shape, nose shape, mouth shape, or any distinctive features
- CONSISTENT faces across all images and videos - same male person, same female person, same faces
- The male person from IMAGE 1 must appear in ALL generated images with the SAME face
- The female person from IMAGE 2 must appear in ALL generated images with the SAME face

LOGO INTEGRATION:
- LOAD the logo image
- REMOVE white background (make transparent)
- PLACE in BOTTOM RIGHT CORNER
- SIZE: 10-15% of image width
- OPACITY: 70-80%

SCENE: {template_info['scene']}
LOCATION: {template_info['location']}
STYLE: {template_info['style']}

COMPOSITION:
- Both people should be clearly visible in the scene
- Natural interaction between the couple
- Professional photography quality
- High resolution, sharp details
- Balanced composition with both faces clearly visible"""
    
    return prompt

def generate_image(template_id):
    """Generira sliku na Replicate"""
    print(f"\n🎨 Generiranje slike za {template_id}...")
    
    # Download logo
    logo_path = download_logo()
    if not logo_path:
        return None
    
    try:
        # Učitaj fileove
        with open(MALE_FACE_PATH, 'rb') as male_file, \
             open(FEMALE_FACE_PATH, 'rb') as female_file, \
             open(logo_path, 'rb') as logo_file:
            
            prompt = create_prompt(template_id)
            
            print("⏳ Šaljem zahtjev na Replicate...")
            print(f"   Prompt: {prompt[:100]}...")
            
            output = client.run(
                IMAGE_MODEL,
                input={
                    "prompt": prompt,
                    "image": male_file,
                    "image2": female_file,
                    "logo": logo_file,
                    "logo_position": "bottom-right",
                    "logo_size": 0.12,
                    "logo_opacity": 0.75,
                    "num_outputs": 1,
                    "guidance_scale": 7.5,
                    "num_inference_steps": 50
                }
            )
            
            # Čekaj da se generacija završi
            if isinstance(output, list) and len(output) > 0:
                image_url = output[0]
            else:
                image_url = output
            
            print(f"✅ Slika generirana: {image_url}")
            return image_url
            
    except Exception as e:
        print(f"❌ Greška pri generiranju: {e}")
        return None
    finally:
        # Obriši temp logo
        if logo_path and os.path.exists(logo_path):
            os.remove(logo_path)

def download_image(image_url, local_path):
    """Download generirane slike"""
    print(f"\n📥 Preuzimanje slike s {image_url}...")
    
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        
        with open(local_path, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ Slika preuzeta: {local_path}")
        return True
    except Exception as e:
        print(f"❌ Greška pri preuzimanju: {e}")
        return False

def upload_to_bunny(local_path, remote_path):
    """Upload slike na Bunny.net"""
    print(f"\n📤 Uploadanje na Bunny.net: {remote_path}...")
    
    url = f'https://storage.bunnycdn.com/{BUNNY_STORAGE_ZONE}/{remote_path}'
    
    try:
        with open(local_path, 'rb') as f:
            response = requests.put(
                url,
                headers={
                    'AccessKey': BUNNY_API_KEY,
                    'Content-Type': 'image/jpeg'
                },
                data=f
            )
        
        if response.status_code in [200, 201]:
            print(f"✅ Uploadano na Bunny.net!")
            cdn_url = f"https://lovestories-cdn.b-cdn.net/{remote_path}"
            print(f"🌐 CDN URL: {cdn_url}")
            return cdn_url
        else:
            print(f"❌ Greška pri uploadu: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Greška: {e}")
        return None

def main():
    # Provjeri argument
    if len(sys.argv) < 2:
        print("Korištenje: python generate-and-upload-single.py <template-id>")
        print("Primjer: python generate-and-upload-single.py template-01")
        sys.exit(1)
    
    template_id = sys.argv[1]
    
    # Provjeri da li template postoji
    template = next((t for t in templates_db['templates'] if t['id'] == template_id), None)
    if not template:
        print(f"❌ Template {template_id} ne postoji!")
        print(f"Dostupni templatei: {', '.join([t['id'] for t in templates_db['templates']])}")
        sys.exit(1)
    
    print("=" * 60)
    print(f"🚀 Generiranje i Upload: {template['name']}")
    print("=" * 60)
    
    # Korak 1: Generiraj sliku
    image_url = generate_image(template_id)
    if not image_url:
        print("❌ Generiranje neuspješno!")
        sys.exit(1)
    
    # Korak 2: Download slike
    local_path = f"generated_{template_id}.jpg"
    if not download_image(image_url, local_path):
        print("❌ Preuzimanje neuspješno!")
        sys.exit(1)
    
    # Korak 3: Upload na Bunny.net
    remote_path = f"{template_id}/generated-image.jpg"
    cdn_url = upload_to_bunny(local_path, remote_path)
    
    if cdn_url:
        print("\n" + "=" * 60)
        print("✅ GOTOVO!")
        print("=" * 60)
        print(f"📸 Lokalna slika: {local_path}")
        print(f"🌐 CDN URL: {cdn_url}")
        print(f"📋 Template: {template['name']}")
        print("=" * 60)
    else:
        print("❌ Upload neuspješan, ali slika je spremljena lokalno!")

if __name__ == '__main__':
    main()

