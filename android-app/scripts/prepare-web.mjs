import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Always bundle the latest repository HTML, not a network URL.
const source = resolve(process.cwd(), '../index.html');
let html = readFileSync(source, 'utf8');
if (!html.includes('id="toggle"') || !html.includes('id="rows"')) throw new Error('Unexpected stopwatch HTML structure');
html = html.replace(/<meta name="google-site-verification"[^>]*>\s*/g, '');
html = html.replace(/<meta name="robots"[^>]*>\s*/g, '');
html = html.replace(/<link rel="canonical"[^>]*>\s*/g, '');
html = html.replace(/<div id="offlineDownloadArea"[\s\S]*?<\/div>/, '');
html = html.replace(/<span id="offlineBadge" hidden>/, '<span id="offlineBadge">');
html = html.replace(/<p id="offlineDescription" class="offline-note" hidden>/, '<p id="offlineDescription" class="offline-note">');
html = html.replace('デシマルストップウォッチ｜無料・ラップ記録・時刻表示対応', 'デシマルストップウォッチ');
// The Android build has no download button; guard the optional handler.
html = html.replace(/\$\('downloadOffline'\)\.onclick/g, "$('downloadOffline')?.onclick");
// Avoid invalid optional-chain assignment; remove the entire download handler instead.
html = html.replace(/if\(\$\('downloadOffline'\)\)\$\('downloadOffline'\)\?\.onclick=\(\)=>\{[\s\S]*?setTimeout\(\(\)=>URL\.revokeObjectURL\(url\),3000\)\};/, '');
// If the handler format changes, retain it behind a null check rather than breaking startup.
html = html.replace(/\$\('downloadOffline'\)\?\.onclick=/g, "$('downloadOffline') && ($('downloadOffline').onclick =");
mkdirSync(resolve(process.cwd(), 'www'), { recursive: true });
writeFileSync(resolve(process.cwd(), 'www/index.html'), html);
console.log('Prepared self-contained offline Android web assets');
