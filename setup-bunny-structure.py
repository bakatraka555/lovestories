#!/usr/bin/env python3
"""
Skripta za organizaciju Bunny.net Storage strukture i upload placeholder slika

1. Kreira strukturu foldera prema couples-templates-database.json
2. Generira placeholder slike za primjere
3. Uploada placeholder slike na Bunny.net
4. Kreira temp/ folder za korisničke uploads
"""

import os
import json
import requests
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import io

# Konfiguracija
BUNNY_STORAGE_ZONE = os.getenv('BUNNY_STORAGE_ZONE', 'lovestories-examples')
BUNNY_API_KEY = os.getenv('BUNNY_API_KEY')
CDN_DOMAIN = 'examples.b-cdn.net'  # CDN domain za pristup

if not BUNNY_API_KEY:
    print('❌ ERROR: BUNNY_API_KEY not set!')
    print('Set it with: export BUNNY_API_KEY="your-api-key"')
    exit(1)

# Učitaj template database
with open('docs/couples-templates-database.json', 'r', encoding='utf-8') as f:
    templates_db = json.load(f)

def generate_placeholder_image(width, height, text, bg_color=(102, 126, 234), text_color=(255, 255, 255)):
    """Generira placeholder sliku s tekstom"""
    # Kreiraj sliku
    img = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Pokušaj koristiti font, ako ne postoji koristi default
    try:
        # Pokušaj pronaći font (Windows/Linux/Mac)
        font_paths = [
            '/System/Library/Fonts/Helvetica.ttc',  # Mac
            'C:/Windows/Fonts/arial.ttf',  # Windows
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',  # Linux
        ]
        font = None
        for font_path in font_paths:
            if os.path.exists(font_path):
                try:
                    font = ImageFont.truetype(font_path, size=min(width, height) // 10)
                    break
                except:
                    pass
    except:
        pass
    
    if font is None:
        font = ImageFont.load_default()
    
    # Centriraj tekst
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    position = ((width - text_width) // 2, (height - text_height) // 2)
    
    draw.text(position, text, fill=text_color, font=font)
    
    # Spremi u bytes
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='JPEG', quality=85)
    img_bytes.seek(0)
    return img_bytes.getvalue()

def generate_thumbnail(image_bytes):
    """Generira thumbnail (200x200)"""
    img = Image.open(io.BytesIO(image_bytes))
    img.thumbnail((200, 200), Image.Resampling.LANCZOS)
    
    thumb_bytes = io.BytesIO()
    img.save(thumb_bytes, format='JPEG', quality=85)
    thumb_bytes.seek(0)
    return thumb_bytes.getvalue()

def upload_to_bunny(file_data, remote_path, content_type='image/jpeg'):
    """Upload file na Bunny.net Storage"""
    url = f'https://storage.bunnycdn.com/{BUNNY_STORAGE_ZONE}/{remote_path}'
    
    try:
        response = requests.put(
            url,
            headers={
                'AccessKey': BUNNY_API_KEY,
                'Content-Type': content_type
            },
            data=file_data
        )
        
        if response.status_code in [200, 201]:
            cdn_url = f'https://{CDN_DOMAIN}/{remote_path}'
            return {'success': True, 'cdn_url': cdn_url}
        else:
            return {'success': False, 'error': f'Status {response.status_code}: {response.text}'}
    except Exception as e:
        return {'success': False, 'error': str(e)}

def setup_template_examples(template):
    """Kreira placeholder slike za template primjere"""
    template_id = template['id']
    template_name = template['name']
    results = []
    
    print(f'\n📁 Template: {template_id} - {template_name}')
    
    # Upload image examples
    if 'examples' in template and 'image' in template['examples']:
        for img_example in template['examples']['image']:
            # Ekstraktiraj filename iz URL-a
            url = img_example['url']
            # Format: https://bunny.net/examples/template-01/vintage-1920s-1.jpg
            # Ili: https://examples.b-cdn.net/template-01/vintage-1920s-1.jpg
            filename = url.split('/')[-1]
            remote_path = f'{template_id}/{filename}'
            
            # Generiraj placeholder (4:3 aspect ratio, 1200x900)
            placeholder_text = f"{template_name}\n{img_example.get('description', 'Example')}"
            image_data = generate_placeholder_image(1200, 900, placeholder_text)
            
            # Upload glavnu sliku
            result = upload_to_bunny(image_data, remote_path, 'image/jpeg')
            if result['success']:
                print(f'  ✅ Image: {remote_path}')
                results.append({'type': 'image', 'path': remote_path, 'url': result['cdn_url']})
            else:
                print(f'  ❌ Image failed: {remote_path} - {result.get("error", "Unknown")}')
            
            # Generiraj i upload thumbnail
            if 'thumbnail' in img_example:
                thumb_url = img_example['thumbnail']
                thumb_filename = thumb_url.split('/')[-1]
                thumb_remote_path = f'{template_id}/thumbs/{thumb_filename}'
                
                thumb_data = generate_thumbnail(image_data)
                thumb_result = upload_to_bunny(thumb_data, thumb_remote_path, 'image/jpeg')
                if thumb_result['success']:
                    print(f'  ✅ Thumbnail: {thumb_remote_path}')
                else:
                    print(f'  ❌ Thumbnail failed: {thumb_remote_path}')
    
    # Upload video thumbnails (video fajlovi će biti uploadani ručno)
    if 'examples' in template and 'video' in template['examples']:
        for vid_example in template['examples']['video']:
            if 'thumbnail' in vid_example:
                thumb_url = vid_example['thumbnail']
                thumb_filename = thumb_url.split('/')[-1]
                thumb_remote_path = f'{template_id}/thumbs/{thumb_filename}'
                
                # Generiraj placeholder za video thumbnail
                placeholder_text = f"{template_name}\nVideo Preview"
                image_data = generate_placeholder_image(1200, 900, placeholder_text, bg_color=(234, 118, 75))
                thumb_data = generate_thumbnail(image_data)
                
                thumb_result = upload_to_bunny(thumb_data, thumb_remote_path, 'image/jpeg')
                if thumb_result['success']:
                    print(f'  ✅ Video Thumbnail: {thumb_remote_path}')
                else:
                    print(f'  ❌ Video Thumbnail failed: {thumb_remote_path}')
    
    return results

def create_temp_folder():
    """Kreira temp/ folder strukturu za korisničke uploads"""
    print('\n📁 Creating temp/ folder structure...')
    
    # Kreiraj placeholder file u temp/ folderu (Bunny.net kreira foldere automatski)
    placeholder_data = generate_placeholder_image(100, 100, 'temp')
    result = upload_to_bunny(placeholder_data, 'temp/.placeholder', 'text/plain')
    
    if result['success']:
        print('  ✅ temp/ folder created')
    else:
        print(f'  ⚠️  temp/ folder: {result.get("error", "Unknown")}')

def main():
    print('🚀 Setting up Bunny.net Storage Structure')
    print(f'📦 Storage Zone: {BUNNY_STORAGE_ZONE}')
    print(f'🌐 CDN Domain: {CDN_DOMAIN}')
    print('=' * 60)
    
    # Kreiraj temp folder
    create_temp_folder()
    
    # Setup svaki template
    all_results = []
    for template in templates_db['templates']:
        results = setup_template_examples(template)
        all_results.extend(results)
    
    print('\n' + '=' * 60)
    print('📊 Summary:')
    print(f'   ✅ Uploaded: {len(all_results)} placeholder images')
    print(f'   📁 Templates: {len(templates_db["templates"])}')
    print('\n💡 Next Steps:')
    print('   1. Replace placeholder images with real generated examples')
    print('   2. Upload video files manually to each template folder')
    print('   3. Update URLs in couples-templates-database.json if needed')
    print('=' * 60)

if __name__ == '__main__':
    main()

