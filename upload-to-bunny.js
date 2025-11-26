#!/usr/bin/env node
/**
 * Skripta za upload fileova na Bunny.net Storage
 * 
 * Korištenje:
 * 1. Postavi BUNNY_API_KEY u environment varijabli
 * 2. Postavi BUNNY_STORAGE_ZONE (npr. lovestories-examples)
 * 3. Pokreni: node upload-to-bunny.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Konfiguracija
const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE || 'lovestories-examples';
const BUNNY_API_KEY = process.env.BUNNY_API_KEY;

if (!BUNNY_API_KEY) {
    console.error('❌ GREŠKA: BUNNY_API_KEY nije postavljen!');
    console.log('Postavi ga sa: export BUNNY_API_KEY="tvoj-api-key"');
    process.exit(1);
}

// Struktura foldera koja će se kreirati
const folderStructure = {
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
};

/**
 * Upload file na Bunny.net Storage
 */
function uploadFile(localPath, remotePath) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(localPath)) {
            console.log(`⚠️  File ne postoji: ${localPath} - preskačem`);
            resolve({ skipped: true, path: remotePath });
            return;
        }

        const fileData = fs.readFileSync(localPath);
        const url = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${remotePath}`;

        const options = {
            method: 'PUT',
            headers: {
                'AccessKey': BUNNY_API_KEY,
                'Content-Type': getContentType(localPath)
            }
        };

        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode === 201 || res.statusCode === 200) {
                    console.log(`✅ Uploadano: ${remotePath}`);
                    resolve({ success: true, path: remotePath });
                } else {
                    console.error(`❌ Greška pri uploadu ${remotePath}: ${res.statusCode} - ${data}`);
                    reject(new Error(`Upload failed: ${res.statusCode}`));
                }
            });
        });

        req.on('error', (error) => {
            console.error(`❌ Network error pri uploadu ${remotePath}:`, error.message);
            reject(error);
        });

        req.write(fileData);
        req.end();
    });
}

/**
 * Odredi Content-Type na osnovu ekstenzije
 */
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const types = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm'
    };
    return types[ext] || 'application/octet-stream';
}

/**
 * Upload sve fileove
 */
async function uploadAll() {
    console.log('🚀 Počinjem upload na Bunny.net Storage...');
    console.log(`📦 Storage Zone: ${BUNNY_STORAGE_ZONE}`);
    console.log('');

    const results = {
        success: 0,
        skipped: 0,
        failed: 0
    };

    for (const [template, files] of Object.entries(folderStructure)) {
        console.log(`📁 Template: ${template}`);
        
        for (const file of files) {
            const localPath = path.join('examples', template, file);
            const remotePath = `${template}/${file}`;
            
            try {
                const result = await uploadFile(localPath, remotePath);
                if (result.skipped) {
                    results.skipped++;
                } else {
                    results.success++;
                }
                // Mala pauza između uploada
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                results.failed++;
                console.error(`   ❌ Greška: ${error.message}`);
            }
        }
        console.log('');
    }

    console.log('='.repeat(50));
    console.log('📊 Rezultati:');
    console.log(`   ✅ Uspješno: ${results.success}`);
    console.log(`   ⚠️  Preskočeno: ${results.skipped}`);
    console.log(`   ❌ Neuspješno: ${results.failed}`);
    console.log('='.repeat(50));
}

// Pokreni upload
uploadAll().catch(console.error);

