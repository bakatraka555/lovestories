#!/usr/bin/env python3
"""
Kreira lokalnu strukturu foldera i placeholder fajlova za Bunny.net upload

Kreira strukturu u: temp/
- template-01/, template-02/, ..., template-13/
- thumbs/ foldere unutar svakog template foldera
- Placeholder slike (JPEG)
- Placeholder video fajlovi (prazni MP4)
- Logo fajl
"""

import os
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import io

# Base directory
BASE_DIR = Path('temp')
TEMPLATES_JSON = 'docs/couples-templates-database.json'

def generate_placeholder_image(width, height, text, bg_color=(102, 126, 234)):
    """Generate placeholder image with text"""
    # Create image
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a font, fallback to default if not available
    try:
        # Try to use a system font
        font_size = min(width, height) // 10
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", min(width, height) // 10)
        except:
            font = ImageFont.load_default()
    
    # Draw text
    text_lines = text.split('\n')
    y_offset = (height - len(text_lines) * 30) // 2
    
    for i, line in enumerate(text_lines):
        bbox = draw.textbbox((0, 0), line, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (width - text_width) // 2
        y = y_offset + i * 30
        draw.text((x, y), line, fill=(255, 255, 255), font=font)
    
    # Save to bytes
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='JPEG', quality=85)
    img_bytes.seek(0)
    return img_bytes.getvalue()

def generate_thumbnail(image_data, size=200):
    """Generate thumbnail from image data"""
    img = Image.open(io.BytesIO(image_data))
    img.thumbnail((size, size), Image.Resampling.LANCZOS)
    
    thumb_bytes = io.BytesIO()
    img.save(thumb_bytes, format='JPEG', quality=85)
    thumb_bytes.seek(0)
    return thumb_bytes.getvalue()

def create_empty_mp4():
    """Create minimal valid MP4 placeholder"""
    # Minimal MP4 header (fmoov box)
    # This is a very basic MP4 structure that browsers will accept
    mp4_header = bytes([
        0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70,  # ftyp box
        0x69, 0x73, 0x6F, 0x6D, 0x00, 0x00, 0x02, 0x00,
        0x69, 0x73, 0x6F, 0x6D, 0x69, 0x73, 0x6F, 0x32,
        0x6D, 0x70, 0x34, 0x31, 0x00, 0x00, 0x00, 0x08,
        0x6D, 0x64, 0x61, 0x74, 0x00, 0x00, 0x00, 0x00   # mdat box (empty)
    ])
    return mp4_header

def create_structure():
    """Create folder structure and placeholder files"""
    print('Creating local folder structure...')
    print(f'Base directory: {BASE_DIR.absolute()}')
    print('=' * 60)
    
    # Load templates database
    with open(TEMPLATES_JSON, 'r', encoding='utf-8') as f:
        templates_db = json.load(f)
    
    files_created = []
    
    # Create logo
    print('\n[1/5] Creating logo...')
    logo_path = BASE_DIR / 'logo.jpg'
    logo_path.parent.mkdir(parents=True, exist_ok=True)
    logo_data = generate_placeholder_image(800, 200, 'LOVE STORIES\nMUSEUM\nLOGO', bg_color=(234, 118, 75))
    with open(logo_path, 'wb') as f:
        f.write(logo_data)
    files_created.append(str(logo_path))
    print(f'  [OK] {logo_path}')
    
    # Create template folders and files
    print('\n[2/5] Creating template folders...')
    for template in templates_db['templates']:
        template_id = template['id']
        template_name = template['name']
        template_dir = BASE_DIR / template_id
        
        # Create directories (thumbs folder nije potreban - Bunny.net Dynamic Image API generira automatski)
        template_dir.mkdir(parents=True, exist_ok=True)
        print(f'\n  Template: {template_id} - {template_name}')
        
        # Create image files (samo glavne slike - thumbnails se generiraju automatski preko Bunny.net Dynamic Image API)
        if 'examples' in template and 'image' in template['examples']:
            for img_example in template['examples']['image']:
                url = img_example['url']
                filename = url.split('/')[-1]
                file_path = template_dir / filename
                
                # Generate placeholder image
                placeholder_text = f"{template_name}\n{img_example.get('description', 'Example')}"
                image_data = generate_placeholder_image(1200, 900, placeholder_text)
                
                with open(file_path, 'wb') as f:
                    f.write(image_data)
                files_created.append(str(file_path))
                print(f'    [OK] {file_path.name}')
                print(f'    [INFO] Thumbnail will be generated automatically via Bunny.net Dynamic Image API')
        
        # Create video files (video thumbnails se također mogu generirati preko Dynamic Image API)
        if 'examples' in template and 'video' in template['examples']:
            for vid_example in template['examples']['video']:
                url = vid_example['url']
                filename = url.split('/')[-1]
                file_path = template_dir / filename
                
                # Create empty MP4 placeholder
                mp4_data = create_empty_mp4()
                with open(file_path, 'wb') as f:
                    f.write(mp4_data)
                files_created.append(str(file_path))
                print(f'    [OK] {file_path.name} (empty MP4)')
                print(f'    [INFO] Video thumbnail will be generated automatically via Bunny.net Dynamic Image API')
    
    # Summary
    print('\n' + '=' * 60)
    print('Summary:')
    print(f'  Total files created: {len(files_created)}')
    print(f'  Templates: {len(templates_db["templates"])}')
    print(f'  Base directory: {BASE_DIR.absolute()}')
    print('\nNext steps:')
    print('  1. Replace placeholder images with real generated examples')
    print('  2. Replace empty MP4 files with real videos')
    print('  3. Replace logo.jpg with real logo (transparent PNG recommended)')
    print('  4. Upload entire "temp/" folder structure to Bunny.net Storage')
    print('  5. Activate Bunny Optimizer + Dynamic Image API in Bunny.net Dashboard')
    print('     (Thumbnails will be generated automatically via URL parameters)')
    print('\nNote:')
    print('  - Thumbnails are NOT needed - Bunny.net Dynamic Image API generates them automatically')
    print('  - Format: image.jpg?width=200&height=200&aspect_ratio=1:1')
    print('=' * 60)
    
    return files_created

if __name__ == '__main__':
    try:
        files = create_structure()
        print(f'\n[SUCCESS] Successfully created {len(files)} files!')
    except Exception as e:
        print(f'\n[ERROR] Error: {e}')
        import traceback
        traceback.print_exc()

