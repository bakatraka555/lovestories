#!/usr/bin/env python3
"""
Skripta za upload fileova na Bunny.net Storage

Korištenje:
1. Postavi BUNNY_API_KEY u environment varijabli
2. Postavi BUNNY_STORAGE_ZONE (npr. lovestories-examples)
3. Pokreni: python upload-to-bunny.py
"""

import os
import sys
import requests
from pathlib import Path

# Konfiguracija
BUNNY_STORAGE_ZONE = os.getenv('BUNNY_STORAGE_ZONE', 'lovestories-examples')
BUNNY_API_KEY = os.getenv('BUNNY_API_KEY')

if not BUNNY_API_KEY:
    print('❌ GREŠKA: BUNNY_API_KEY nije postavljen!')
    print('Postavi ga sa: export BUNNY_API_KEY="tvoj-api-key"')
    sys.exit(1)

# Struktura foldera
FOLDER_STRUCTURE = {
    'template-01': [
        'vintage-1920s-1.jpg',
        'vintage-1920s-2.jpg',
        'vintage-1920s-1.mp4',
        'thumbs/vintage-1920s-1-thumb.jpg',
        'thumbs/vintage-1920s-2-thumb.jpg',
        'thumbs/vintage-1920s-1-video-thumb.jpg'
    ],
    'template-02': [
        'medieval-romance-1.jpg',
        'medieval-romance-1.mp4',
        'thumbs/medieval-romance-1-thumb.jpg',
        'thumbs/medieval-romance-1-video-thumb.jpg'
    ],
    'template-03': [
        'beach-sunset-1.jpg',
        'beach-sunset-1.mp4',
        'thumbs/beach-sunset-1-thumb.jpg',
        'thumbs/beach-sunset-1-video-thumb.jpg'
    ],
    'template-04': [
        'city-lights-1.jpg',
        'city-lights-1.mp4',
        'thumbs/city-lights-1-thumb.jpg',
        'thumbs/city-lights-1-video-thumb.jpg'
    ],
    'template-05': [
        'garden-wedding-1.jpg',
        'garden-wedding-1.mp4',
        'thumbs/garden-wedding-1-thumb.jpg',
        'thumbs/garden-wedding-1-video-thumb.jpg'
    ],
    'template-06': [
        'casino-glamour-1.jpg',
        'casino-glamour-1.mp4',
        'thumbs/casino-glamour-1-thumb.jpg',
        'thumbs/casino-glamour-1-video-thumb.jpg'
    ],
    'template-07': [
        'chibi-3d-1.jpg',
        'chibi-3d-1.mp4',
        'thumbs/chibi-3d-1-thumb.jpg',
        'thumbs/chibi-3d-1-video-thumb.jpg'
    ],
    'template-08': [
        'trading-card-1.jpg',
        'trading-card-1.mp4',
        'thumbs/trading-card-1-thumb.jpg',
        'thumbs/trading-card-1-video-thumb.jpg'
    ],
    'template-09': [
        'dubrovnik-sunrise-1.jpg',
        'dubrovnik-sunrise-1.mp4',
        'thumbs/dubrovnik-sunrise-1-thumb.jpg',
        'thumbs/dubrovnik-sunrise-1-video-thumb.jpg'
    ],
    'template-10': [
        'volcano-adventure-1.jpg',
        'volcano-adventure-1.mp4',
        'thumbs/volcano-adventure-1-thumb.jpg',
        'thumbs/volcano-adventure-1-video-thumb.jpg'
    ],
    'template-11': [
        'instagram-frame-1.jpg',
        'instagram-frame-1.mp4',
        'thumbs/instagram-frame-1-thumb.jpg',
        'thumbs/instagram-frame-1-video-thumb.jpg'
    ],
    'template-12': [
        'forever-together-1.jpg',
        'forever-together-1.mp4',
        'thumbs/forever-together-1-thumb.jpg',
        'thumbs/forever-together-1-video-thumb.jpg'
    ],
    'template-13': [
        'cinematic-travel-1.jpg',
        'cinematic-travel-1.mp4',
        'thumbs/cinematic-travel-1-thumb.jpg',
        'thumbs/cinematic-travel-1-video-thumb.jpg'
    ]
}

def get_content_type(file_path):
    """Odredi Content-Type na osnovu ekstenzije"""
    ext = Path(file_path).suffix.lower()
    types = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm'
    }
    return types.get(ext, 'application/octet-stream')

def upload_file(local_path, remote_path):
    """Upload file na Bunny.net Storage"""
    if not os.path.exists(local_path):
        print(f'⚠️  File ne postoji: {local_path} - preskačem')
        return {'skipped': True, 'path': remote_path}
    
    url = f'https://storage.bunnycdn.com/{BUNNY_STORAGE_ZONE}/{remote_path}'
    
    try:
        with open(local_path, 'rb') as f:
            response = requests.put(
                url,
                headers={
                    'AccessKey': BUNNY_API_KEY,
                    'Content-Type': get_content_type(local_path)
                },
                data=f
            )
        
        if response.status_code in [200, 201]:
            print(f'✅ Uploadano: {remote_path}')
            return {'success': True, 'path': remote_path}
        else:
            print(f'❌ Greška pri uploadu {remote_path}: {response.status_code}')
            return {'failed': True, 'path': remote_path}
    except Exception as e:
        print(f'❌ Greška: {e}')
        return {'failed': True, 'path': remote_path}

def main():
    print('🚀 Počinjem upload na Bunny.net Storage...')
    print(f'📦 Storage Zone: {BUNNY_STORAGE_ZONE}')
    print('')
    
    results = {'success': 0, 'skipped': 0, 'failed': 0}
    
    for template, files in FOLDER_STRUCTURE.items():
        print(f'📁 Template: {template}')
        
        for file in files:
            local_path = Path('examples') / template / file
            remote_path = f'{template}/{file}'
            
            result = upload_file(str(local_path), remote_path)
            
            if result.get('skipped'):
                results['skipped'] += 1
            elif result.get('success'):
                results['success'] += 1
            else:
                results['failed'] += 1
            
            # Mala pauza između uploada
            import time
            time.sleep(0.1)
        
        print('')
    
    print('=' * 50)
    print('📊 Rezultati:')
    print(f'   ✅ Uspješno: {results["success"]}')
    print(f'   ⚠️  Preskočeno: {results["skipped"]}')
    print(f'   ❌ Neuspješno: {results["failed"]}')
    print('=' * 50)

if __name__ == '__main__':
    main()

