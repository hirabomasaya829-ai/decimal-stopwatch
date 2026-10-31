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
// Remove the website-only download handler. No button exists in the Android app.
const handlerStart = html.indexOf("if($('downloadOffline'))$('downloadOffline').onclick=()=>{");
const handlerEnd = html.indexOf("$('swapTime').onclick=swapTime;", handlerStart);
if (handlerStart < 0 || handlerEnd < 0) throw new Error('Offline download handler changed; update Android build script');
html = html.slice(0, handlerStart) + html.slice(handlerEnd);
mkdirSync(resolve(process.cwd(), 'www'), { recursive: true });
writeFileSync(resolve(process.cwd(), 'www/index.html'), html);
console.log('Prepared self-contained offline Android web assets');
