#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const sharp = require('sharp');

const workspaceRoot = path.resolve(__dirname, '..');
const publicDir = path.join(workspaceRoot, 'public', 'assets', 'optimized');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Download failed: ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    }).on('error', reject);
  });
}

async function processImage(url, nameBase) {
  try {
    const parsed = new URL(url);
    const ext = path.extname(parsed.pathname) || '.jpg';
    const tmpPath = path.join(publicDir, nameBase + ext);
    await download(url, tmpPath);
    const out800 = path.join(publicDir, nameBase + '-800.webp');
    const out400 = path.join(publicDir, nameBase + '-400.webp');
    await sharp(tmpPath).resize(800).webp({quality: 80}).toFile(out800);
    await sharp(tmpPath).resize(400).webp({quality: 70}).toFile(out400);
    fs.unlinkSync(tmpPath);
    return { out800: '/assets/optimized/' + path.basename(out800), out400: '/assets/optimized/' + path.basename(out400) };
  } catch (err) {
    console.error('Failed to process', url, err.message);
    return null;
  }
}

async function main() {
  const eventsFile = path.join(workspaceRoot, 'src', 'data', 'eventsData.ts');
  const artistsFile = path.join(workspaceRoot, 'src', 'pages', 'Artistas.tsx');
  const indexFile = path.join(workspaceRoot, 'src', 'pages', 'Index.tsx');
  const shortsFile = path.join(workspaceRoot, 'src', 'data', 'shortFilmsSample.ts');
  const files = [eventsFile, artistsFile, indexFile, shortsFile];

  const urlRegex = /(?:https?:|data:)(?:[^\"'\n\r>])+/g;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const urls = Array.from(new Set(content.match(urlRegex) || [])).filter(u => !u.startsWith('data:'));
    for (const url of urls) {
      try {
        const nameBase = path.basename(new URL(url).pathname).replace(/[^a-z0-9\-]/gi, '_').split('.')[0];
        console.log('Processing', url);
        const res = await processImage(url, nameBase);
        if (res) {
          // Replace all exact occurrences of the url in the file with the optimized 800px webp path
          const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          content = content.replace(new RegExp(escaped, 'g'), res.out800);
          fs.writeFileSync(file, content, 'utf8');
          console.log('Rewrote', file, '->', res.out800);
        }
      } catch (err) {
        console.error('Error handling', url, err.message);
      }
    }
  }
  console.log('Done. Optimized images are in public/assets/optimized/');
}

main().catch(err => { console.error(err); process.exit(1); });
