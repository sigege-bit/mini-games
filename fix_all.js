const fs = require('fs');
const path = require('path');

// 1. ルート index.html の絵文字修正（♂マークの完全除去）
const rootPath = path.join(__dirname, 'index.html');
if (fs.existsSync(rootPath)) {
  let rootHtml = fs.readFileSync(rootPath, 'utf8');
  rootHtml = rootHtml.replace(/🏃[\u200D\uFE0F\u2642]*/g, '🏃');
  rootHtml = rootHtml.replace(/♂/g, '');
  fs.writeFileSync(rootPath, rootHtml, 'utf8');
  console.log('[OK] ルート index.html の ♂ マークを除去しました');
}

// 2. 全ゲーム（01〜06）のアスペクト比崩れ防止と絵文字修正
const gameDirs = [
  '01-stack-tower',
  '02-catch-game',
  '03-space-kicker',
  '04-emoji-slash',
  '05-jump-ninja',
  '06-survivor'
];

gameDirs.forEach(dir => {
  const filePath = path.join(__dirname, dir, 'index.html');
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, 'utf8');

  // 絵文字置換
  html = html.replace(/🏃[\u200D\uFE0F\u2642]*/g, '🏃');
  html = html.replace(/♂/g, '');

  // 歪みの原因となった強制アスペクト比CSSを安全なスタイルに置換
  html = html.replace(/aspect-ratio:\s*9\s*\/\s*16\s*!important;/g, '');
  html = html.replace(/canvas\s*\{[^}]*max-width:\s*480px[^}]*\}/g, '');

  const correctStyle = `
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      background-color: #06070d !important;
      overflow: hidden !important;
    }
    canvas {
      display: block !important;
      margin: auto !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      width: auto !important;
      height: auto !important;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.8) !important;
    }
  `;

  if (html.includes('</style>')) {
    html = html.replace('</style>', `${correctStyle}\n</style>`);
  }

  // 06-survivor の Phaser 内部解像度を縦型（480x800）へ適正化
  if (dir === '06-survivor') {
    html = html.replace(/width:\s*\d+,\s*height:\s*\d+/g, 'width: 480, height: 800');
    // Scale モードを FIT に設定して比率を自動維持
    if (!html.includes('Phaser.Scale.FIT')) {
      html = html.replace(/scale:\s*\{[^}]*\}/g, 'scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }');
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`[OK] 正常化完了: ${dir}/index.html`);
});
console.log('すべての修正が正常に完了しました。');

