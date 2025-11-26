#!/usr/bin/env python3
"""
Script za generiranje primjera slika i videa za sve templatee.
Koristi Replicate API za batch generiranje.

Potrebno:
- Replicate API token u environment varijabli: REPLICATE_API_TOKEN
- Test slike parova
- Logo slika (transparentan PNG)
"""

import os
import json
import replicate
from pathlib import Path

# Učitaj API token
REPLICATE_API_TOKEN = os.getenv('REPLICATE_API_TOKEN')
if not REPLICATE_API_TOKEN:
    print("❌ GREŠKA: REPLICATE_API_TOKEN nije postavljen!")
    print("Postavi ga sa: export REPLICATE_API_TOKEN='tvoj-token'")
    exit(1)

# Inicijaliziraj Replicate client
client = replicate.Client(api_token=REPLICATE_API_TOKEN)

# Učitaj template database
with open('docs/couples-templates-database.json', 'r', encoding='utf-8') as f:
    templates_db = json.load(f)

# Konfiguracija
IMAGE_MODEL = "google/nano-banana-pro"
VIDEO_MODEL = "kwaivgi/kling-v2.5-turbo-pro"
LOGO_PATH = "logo.png"  # Promijeni ako je drugačije
MALE_FACE_PATH = "male-face.jpg"  # Muško lice - reference model
FEMALE_FACE_PATH = "female-face.jpg"  # Žensko lice - reference model

# Provjeri da li postoje potrebne datoteke
if not os.path.exists(LOGO_PATH):
    print(f"⚠️  UPOZORENJE: Logo datoteka '{LOGO_PATH}' ne postoji!")
    print("   Kreiraj transparentan PNG logo prije pokretanja.")

if not os.path.exists(MALE_FACE_PATH):
    print(f"⚠️  UPOZORENJE: Muško lice '{MALE_FACE_PATH}' ne postoji!")
    print("   Dodaj sliku muškog lica (reference model) prije pokretanja.")

if not os.path.exists(FEMALE_FACE_PATH):
    print(f"⚠️  UPOZORENJE: Žensko lice '{FEMALE_FACE_PATH}' ne postoji!")
    print("   Dodaj sliku ženskog lica (reference model) prije pokretanja.")

# Prompt template za svaki template
PROMPTS = {
    "template-01": {
        "image": "Ultra-photorealistic, highly cinematic vintage 1920s photograph. Romantic couple in vintage 1920s style clothing, elegant and timeless. Black and white or sepia tone, art deco aesthetic, glamorous atmosphere.",
        "video": "Cinematic vintage 1920s scene. Romantic couple in elegant 1920s attire, slow motion, glamorous atmosphere, art deco style."
    },
    "template-02": {
        "image": "Ultra-photorealistic, highly cinematic medieval fantasy photograph. King and queen in Dubrovnik, Game of Thrones style. Majestic, regal, epic atmosphere with Dubrovnik old town in background.",
        "video": "Cinematic medieval scene. King and queen in Dubrovnik, Game of Thrones style, majestic and regal, epic atmosphere."
    },
    "template-03": {
        "image": "Ultra-photorealistic, highly cinematic beach sunset photograph. Romantic couple on beach during sunset, warm golden light, ocean waves, romantic atmosphere.",
        "video": "Cinematic beach sunset scene. Romantic couple on beach, golden hour, ocean waves, slow motion, romantic atmosphere."
    },
    "template-04": {
        "image": "Ultra-photorealistic, highly cinematic city night photograph. Couple in city at night with bokeh lights, glamorous, sophisticated, urban atmosphere.",
        "video": "Cinematic city night scene. Couple in urban setting with bokeh lights, glamorous, sophisticated atmosphere."
    },
    "template-05": {
        "image": "Ultra-photorealistic, highly cinematic garden wedding photograph. Romantic wedding in garden setting, flowers, natural light, elegant and romantic atmosphere.",
        "video": "Cinematic garden wedding scene. Romantic wedding ceremony in beautiful garden, flowers, natural setting, elegant atmosphere."
    },
    "template-07": {
        "image": "Ultra-photorealistic, highly cinematic 3D chibi style photograph. Cute 3D chibi characters, kawaii style, sweet and romantic, colorful.",
        "video": "Cinematic 3D chibi scene. Cute 3D chibi characters, kawaii style, sweet and romantic, colorful animation."
    },
    "template-08": {
        "image": "Ultra-photorealistic, highly cinematic trading card style photograph. Epic trading card design, dynamic composition, fantasy elements, dramatic lighting.",
        "video": "Cinematic trading card style scene. Epic design, dynamic composition, fantasy elements, dramatic atmosphere."
    },
    "template-09": {
        "image": "Ultra-photorealistic, highly cinematic Dubrovnik sunrise photograph. Romantic couple in Dubrovnik at sunrise, St. Vlaho church in background, warm morning light, travel photography style.",
        "video": "Cinematic Dubrovnik sunrise scene. Romantic couple in Dubrovnik, St. Vlaho church, warm morning light, travel style."
    },
    "template-10": {
        "image": "Ultra-photorealistic, highly cinematic 3D big head caricature photograph. Adventure theme, volcano background, fun and playful, 3D style.",
        "video": "Cinematic 3D caricature scene. Adventure theme, volcano background, fun and playful, 3D animation style."
    },
    "template-11": {
        "image": "Ultra-photorealistic, highly cinematic Instagram frame style photograph. Social media aesthetic, finger heart gesture, modern, trendy, colorful.",
        "video": "Cinematic Instagram frame style scene. Social media aesthetic, finger heart gesture, modern and trendy."
    },
    "template-12": {
        "image": "Ultra-photorealistic, highly cinematic 3D collectible figure photograph. Couple as 3D collectible figures in box, premium quality, detailed, collectible style.",
        "video": "Cinematic 3D collectible scene. Couple as 3D figures in collectible box, premium quality, detailed animation."
    },
    "template-13": {
        "image": "Ultra-photorealistic, highly cinematic travel photography. Professional travel photograph, Dubrovnik location, cinematic composition, professional quality.",
        "video": "Cinematic travel scene. Professional travel video, Dubrovnik location, cinematic composition, professional quality."
    }
}

def generate_image(template_id, prompt, output_path):
    """Generira sliku koristeći nano-banana-pro s 2 input slike (muško + žensko lice)"""
    print(f"📸 Generiranje slike za {template_id}...")
    
    try:
        # Učitaj logo i reference slike
        logo_file = open(LOGO_PATH, 'rb')
        male_face_file = open(MALE_FACE_PATH, 'rb')
        female_face_file = open(FEMALE_FACE_PATH, 'rb')
        
        # Dodaj face consistency instrukcije u prompt
        enhanced_prompt = f"""Ultra-photorealistic, highly cinematic photograph.

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

{prompt}

COMPOSITION:
- Both people should be clearly visible in the scene
- Natural interaction between the couple
- Professional photography quality
- High resolution, sharp details
- Balanced composition with both faces clearly visible"""
        
        output = client.run(
            IMAGE_MODEL,
            input={
                "prompt": enhanced_prompt,
                "image": male_face_file,      # IMAGE 1: Muško lice
                "image2": female_face_file,  # IMAGE 2: Žensko lice
                "logo": logo_file,
                "logo_position": "bottom-right",
                "logo_size": 0.12,
                "logo_opacity": 0.75,
                "num_outputs": 1,
                "guidance_scale": 7.5,
                "num_inference_steps": 50
            }
        )
        
        # Zatvori fileove
        logo_file.close()
        male_face_file.close()
        female_face_file.close()
        
        # Download rezultat
        # output je URL ili file path
        print(f"✅ Slika generirana: {output}")
        return output
        
    except Exception as e:
        print(f"❌ Greška pri generiranju slike: {e}")
        return None

def generate_video(template_id, prompt, output_path):
    """Generira video koristeći kling-v2.5-turbo-pro"""
    print(f"🎬 Generiranje videa za {template_id}...")
    
    try:
        output = client.run(
            VIDEO_MODEL,
            input={
                "prompt": prompt,
                "duration": 5,
                "aspect_ratio": "16:9"
            }
        )
        
        print(f"✅ Video generiran: {output}")
        return output
        
    except Exception as e:
        print(f"❌ Greška pri generiranju videa: {e}")
        return None

def main():
    """Glavna funkcija za batch generiranje"""
    print("🚀 Počinjem generiranje primjera za sve templatee...")
    print(f"📊 Ukupno templatea: {len(templates_db['templates'])}")
    print(f"💰 Procijenjeni trošak: ~$8.46")
    print()
    
    # Pitanje za potvrdu
    confirm = input("Želiš li nastaviti? (da/ne): ")
    if confirm.lower() != 'da':
        print("❌ Prekinuto.")
        return
    
    results = {}
    
    for template in templates_db['templates']:
        template_id = template['id']
        print(f"\n{'='*50}")
        print(f"📋 Template: {template['name']} ({template_id})")
        print(f"{'='*50}")
        
        # Generiraj slike
        image_results = []
        for img_example in template['examples']['image']:
            prompt = PROMPTS.get(template_id, {}).get('image', '')
            result = generate_image(template_id, prompt, img_example['id'])
            if result:
                image_results.append({
                    'id': img_example['id'],
                    'url': result,
                    'status': 'success'
                })
            else:
                image_results.append({
                    'id': img_example['id'],
                    'status': 'failed'
                })
        
        # Generiraj video
        video_results = []
        for vid_example in template['examples']['video']:
            prompt = PROMPTS.get(template_id, {}).get('video', '')
            result = generate_video(template_id, prompt, vid_example['id'])
            if result:
                video_results.append({
                    'id': vid_example['id'],
                    'url': result,
                    'status': 'success'
                })
            else:
                video_results.append({
                    'id': vid_example['id'],
                    'status': 'failed'
                })
        
        results[template_id] = {
            'images': image_results,
            'videos': video_results
        }
    
    # Spremi rezultate
    with open('generation-results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print("\n" + "="*50)
    print("✅ Generiranje završeno!")
    print("📄 Rezultati spremljeni u: generation-results.json")
    print("="*50)

if __name__ == "__main__":
    main()

