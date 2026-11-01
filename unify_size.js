const fs = require('fs');
const path = require('path');

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

  // 1. CSSでcanvasの最大幅を480px、画面中央配置に統一
  const styleReplacement = `
    html, body {
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #06070d;
      overflow: hidden;
    }
    canvas {
      display: block !important;
      margin: auto !important;
      max-width: 480px !important;
      max-height: 854px !important;
      width: 100% !important;
      height: auto !important;
      aspect-ratio: 9 / 16 !important;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
    }
  `;

  // 既存の body/canvas スタイルを上書き・追加
  if (html.includes('</style>')) {
    html = html.replace('</style>', `${styleReplacement}\n</style>`);
  }

  // 2. 06-survivor の Phaser 内部解像度を縦型（480x800）に補正
  if (dir === '06-survivor') {
    html = html.replace(/width:\s*\d+,?\s*height:\s*\d+/g, 'width: 480, height: 800');
    html = html.replace(/width:\s*window\.innerWidth.*?,/g, 'width: 480,');
    html = html.replace(/height:\s*window\.innerHeight.*?,/g, 'height: 800,');
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`[OK] 統一完了: ${dir}/index.html`);
});
console.log('すべてのゲームの横幅（480px基準）の統一が完了しました。');
