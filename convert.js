const fs = require('fs');
const sharp = require('sharp');

const svgPath = 'C:/Users/GameDeal/.gemini/antigravity-ide/brain/7fd0cf66-74af-4550-a3b1-9bf7e0bbc188/logo_s_exact.svg';
const pngPath = 'C:/Users/GameDeal/.gemini/antigravity-ide/brain/7fd0cf66-74af-4550-a3b1-9bf7e0bbc188/logo_s_exact.png';

const svgBuffer = fs.readFileSync(svgPath);

sharp(svgBuffer)
  .png()
  .toFile(pngPath)
  .then(() => console.log('Successfully converted SVG to PNG'))
  .catch(err => console.error('Error converting:', err));
