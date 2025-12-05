#!/usr/bin/env python3
"""
Skripta za generiranje thumbnails za postojeće slike na Bunny.net

1. Čita couples-templates-database.json
2. Za svaku sliku downloada s Bunny.net (ili koristi lokalne fajlove)
3. Generira thumbnail (200x200px)
4. Uploada thumbnail na Bunny.net

Korištenje:
1. Postavi BUNNY_API_KEY u environment varijabli ili .env fajlu
2. Pokreni: python generate-thumbnails-for-existing.py
"""

import os
import json
import requests
from pathlib import Path
from PIL import Image
import io
from urllib.parse import urlparse

# Load .env file if it exists
def load_env_file():
    """Load environment variables from .env file"""
    env_path = Path('.env')
    if env_path.exists():
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    key = key.strip()
                    value = value.strip().strip('"').strip("'")
                    os.environ[key] = value

# Load .env file
load_env_file()

# Konfiguracija
BUNNY_STORAGE_ZONE = os.getenv('BUNNY_STORAGE_ZONE', 'lovestories-examples')
BUNNY_API_KEY = os.getenv('BUNNY_API_KEY')
CDN_DOMAIN = 'examples.b-cdn.net'

if not BUNNY_API_KEY:
    print('ERROR: BUNNY_API_KEY nije postavljen!')
    print('\nOpcije za postavljanje:')
    print('1. Kreiraj .env fajl s: BUNNY_API_KEY=your-api-key')
    print('2. PowerShell: $env:BUNNY_API_KEY="your-api-key"')
    print('3. CMD: set BUNNY_API_KEY=your-api-key')
    exit(1)

def download_image_from_bunny(url):
    """Downloada sliku s Bunny.net CDN-a"""
    try:
        print(f'  Downloading: {url}')
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.content
    except Exception as e:
        print(f'  [ERROR] Error downloading: {e}')
        return None

def generate_thumbnail(image_data, size=200):
    """Generira thumbnail iz image data"""
    try:
        img = Image.open(io.BytesIO(image_data))
        # Resize s aspect ratio preservation
        img.thumbnail((size, size), Image.Resampling.LANCZOS)
        
        # Convert to RGB if needed (za PNG s transparency)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        
        thumb_bytes = io.BytesIO()
        img.save(thumb_bytes, format='JPEG', quality=85, optimize=True)
        thumb_bytes.seek(0)
        return thumb_bytes.getvalue()
    except Exception as e:
        print(f'  [ERROR] Error generating thumbnail: {e}')
        return None

def upload_to_bunny(file_data, remote_path, content_type='image/jpeg'):
    """Uploada fajl na Bunny.net Storage"""
    upload_url = f'https://storage.bunnycdn.com/{BUNNY_STORAGE_ZONE}/{remote_path}'
    
    try:
        response = requests.put(
            upload_url,
            headers={
                'AccessKey': BUNNY_API_KEY,
                'Content-Type': content_type
            },
            data=file_data,
            timeout=30
        )
        
        if response.status_code in (200, 201):
            cdn_url = f'https://{CDN_DOMAIN}/{remote_path}'
            return {'success': True, 'cdn_url': cdn_url}
        else:
            return {'success': False, 'error': f'HTTP {response.status_code}: {response.text}'}
    except Exception as e:
        return {'success': False, 'error': str(e)}

def extract_path_from_url(url):
    """Ekstraktira putanju iz CDN URL-a"""
    # Format: https://examples.b-cdn.net/temp/template-01/vintage-1920s-1.jpg
    # Vraća: temp/template-01/vintage-1920s-1.jpg
    parsed = urlparse(url)
    path = parsed.path.lstrip('/')
    return path

def process_image(image_data, template_id, image_url):
    """Procesira jednu sliku - generira i uploada thumbnail"""
    # Ekstraktiraj filename iz URL-a
    filename = image_url.split('/')[-1]
    name_without_ext = filename.rsplit('.', 1)[0]
    
    # Generiraj thumbnail path
    thumb_filename = f'{name_without_ext}-thumb.jpg'
    thumb_remote_path = f'temp/{template_id}/thumbs/{thumb_filename}'
    
    # Generiraj thumbnail
    print(f'  Generating thumbnail...')
    thumbnail_data = generate_thumbnail(image_data)
    
    if not thumbnail_data:
        return False
    
    # Upload thumbnail
    print(f'  Uploading thumbnail: {thumb_remote_path}')
    result = upload_to_bunny(thumbnail_data, thumb_remote_path)
    
    if result['success']:
        print(f'  [OK] Thumbnail uploaded: {result["cdn_url"]}')
        return result['cdn_url']
    else:
        print(f'  [ERROR] Thumbnail upload failed: {result.get("error", "Unknown")}')
        return False

def main():
    # Učitaj JSON
    json_path = Path('docs/couples-templates-database.json')
    if not json_path.exists():
        print(f'[ERROR] JSON fajl ne postoji: {json_path}')
        exit(1)
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f'[INFO] Ucitano {len(data["templates"])} template-a\n')
    
    total_images = 0
    successful = 0
    failed = 0
    skipped = 0
    
    # Procesiraj svaki template
    for template in data['templates']:
        template_id = template['id']
        template_name = template['name']
        
        print(f'\n{"="*60}')
        print(f'Template: {template_id} - {template_name}')
        print(f'{"="*60}')
        
        # Procesiraj image examples
        if 'examples' in template and 'image' in template['examples']:
            for img_example in template['examples']['image']:
                total_images += 1
                image_url = img_example.get('url')
                thumbnail_url = img_example.get('thumbnail')
                
                if not image_url:
                    print(f'  [SKIP] Skipping: No URL')
                    skipped += 1
                    continue
                
                # Provjeri da li thumbnail već postoji
                if thumbnail_url:
                    # Provjeri da li thumbnail stvarno postoji na Bunny.net
                    try:
                        response = requests.head(thumbnail_url, timeout=10)
                        if response.status_code == 200:
                            print(f'  [SKIP] Thumbnail vec postoji: {thumbnail_url}')
                            skipped += 1
                            continue
                    except:
                        pass  # Ako ne može provjeriti, nastavi s generiranjem
                
                print(f'\n  Processing: {image_url}')
                
                # Downloadaj sliku
                image_data = download_image_from_bunny(image_url)
                
                if not image_data:
                    print(f'  [ERROR] Failed to download image')
                    failed += 1
                    continue
                
                # Procesiraj i uploadaj thumbnail
                result = process_image(image_data, template_id, image_url)
                
                if result:
                    successful += 1
                    print(f'  [OK] Success! Thumbnail URL: {result}')
                else:
                    failed += 1
    
    # Sažetak
    print(f'\n{"="*60}')
    print(f'[SUMMARY] SAZETAK')
    print(f'{"="*60}')
    print(f'Ukupno slika: {total_images}')
    print(f'[OK] Uspjesno: {successful}')
    print(f'[ERROR] Neuspjesno: {failed}')
    print(f'[SKIP] Preskoceno: {skipped}')
    print(f'\n[TIP] Azuriraj couples-templates-database.json s novim thumbnail URL-ovima!')

if __name__ == '__main__':
    main()

