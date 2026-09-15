import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function processLogo() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true }).catch(() => chromium.launch({ headless: true }));
  const page = await browser.newPage();

  const logoBase64 = fs.readFileSync('public/images/ait-cycling-logo.png').toString('base64');
  const dataUrl = `data:image/png;base64,${logoBase64}`;

  const processedData = await page.evaluate(async (imgSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Create 2 variations:
        // 1. Dark silhouette with transparent background
        // 2. Glowing white/gold-lime silhouette with transparent background for dark UI

        const darkCanvas = document.createElement('canvas');
        darkCanvas.width = img.width;
        darkCanvas.height = img.height;
        const darkCtx = darkCanvas.getContext('2d');
        const darkImgData = darkCtx.createImageData(canvas.width, canvas.height);

        const lightCanvas = document.createElement('canvas');
        lightCanvas.width = img.width;
        lightCanvas.height = img.height;
        const lightCtx = lightCanvas.getContext('2d');
        const lightImgData = lightCtx.createImageData(canvas.width, canvas.height);

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Luminance: 0 = black, 255 = white
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          
          // Invert luminance for transparency: dark pixels should have high alpha, white pixels alpha = 0
          // Threshold and smooth transition
          let alpha = Math.max(0, Math.min(255, (235 - lum) * 1.6));
          if (lum > 240) alpha = 0;

          // Variant 1: Pure dark lines (original color, transparent background)
          darkImgData.data[i] = 18;      // R
          darkImgData.data[i + 1] = 24;  // G
          darkImgData.data[i + 2] = 19;  // B
          darkImgData.data[i + 3] = alpha;

          // Variant 2: Crisp warm white with subtle lime glow for dark theme
          lightImgData.data[i] = 244;     // R
          lightImgData.data[i + 1] = 243; // G
          lightImgData.data[i + 2] = 236; // B
          lightImgData.data[i + 3] = alpha;
        }

        darkCtx.putImageData(darkImgData, 0, 0);
        lightCtx.putImageData(lightImgData, 0, 0);

        resolve({
          transparentDark: darkCanvas.toDataURL('image/png'),
          transparentLight: lightCanvas.toDataURL('image/png')
        });
      };
      img.src = imgSrc;
    });
  }, dataUrl);

  // Write outputs
  const darkBuf = Buffer.from(processedData.transparentDark.split(',')[1], 'base64');
  const lightBuf = Buffer.from(processedData.transparentLight.split(',')[1], 'base64');

  fs.writeFileSync('public/images/ait-cycling-logo-dark.png', darkBuf);
  fs.writeFileSync('public/images/ait-cycling-logo-light.png', lightBuf);

  console.log('Successfully generated ait-cycling-logo-dark.png and ait-cycling-logo-light.png!');
  await browser.close();
}

processLogo().catch(console.error);
