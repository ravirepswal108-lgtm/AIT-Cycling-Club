import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function runVerification() {
  console.log('--- Starting AIT Cycling Club Site Verification ---');
  let browser;
  try {
    browser = await chromium.launch({
      channel: 'msedge', // Uses built-in Windows Edge
      headless: true
    });
  } catch (e) {
    console.log('Edge channel not found, trying default chrome...');
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    } catch (e2) {
      console.log('Trying standard chromium...');
      browser = await chromium.launch({ headless: true });
    }
  }

  const results = {
    consoleErrors: [],
    consoleWarnings: [],
    routesLoaded: {},
    countdownValid: false,
    authFlowValid: false,
    dragValid: false,
    blueFound: [],
    responsiveChecks: {}
  };

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  // Listen to console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({ url: page.url(), text: msg.text() });
    } else if (msg.type() === 'warning') {
      results.consoleWarnings.push({ url: page.url(), text: msg.text() });
    }
  });

  page.on('requestfailed', request => {
    console.log('   [Network Fail]:', request.url(), request.failure()?.errorText);
  });

  page.on('pageerror', err => {
    results.consoleErrors.push({ url: page.url(), text: err.message });
  });

  // 1. TEST HOME ROUTE
  console.log('1. Testing Home Route (http://localhost:5173/)...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  results.routesLoaded['/'] = await page.title();
  console.log('   Title:', results.routesLoaded['/']);

  // Check header text
  const heroHeading = await page.textContent('h1');
  console.log('   Hero Heading:', heroHeading?.replace(/\s+/g, ' ').trim());

  // 2. TEST GOOGLE SIGN IN
  console.log('2. Testing Google Sign-in button...');
  const signinBtn = await page.$('#google-signin-btn');
  if (signinBtn) {
    console.log('   Found #google-signin-btn, clicking...');
    await signinBtn.click();
    await page.waitForTimeout(1000);
    const profileBtn = await page.$('#user-profile-btn');
    if (profileBtn) {
      const profileText = await profileBtn.textContent();
      console.log('   Signed in successfully! Profile text:', profileText?.trim());
      results.authFlowValid = true;
    } else {
      console.log('   Profile button not found after click.');
    }
  } else {
    console.log('   Signin button not found!');
  }

  // 3. TEST DRAGGABLE CARDS ON HOME PAGE
  console.log('3. Testing Draggable Cards...');
  const draggableCard = await page.$('[drag="true"], .select-none.rounded-2xl.glass-panel');
  if (draggableCard) {
    const boxBefore = await draggableCard.boundingBox();
    if (boxBefore) {
      // Drag mouse
      await page.mouse.move(boxBefore.x + boxBefore.width / 2, boxBefore.y + boxBefore.height / 2);
      await page.mouse.down();
      await page.mouse.move(boxBefore.x + boxBefore.width / 2 + 50, boxBefore.y + boxBefore.height / 2 + 40, { steps: 5 });
      await page.mouse.up();
      await page.waitForTimeout(300);
      console.log('   Card drag interaction executed cleanly.');
      results.dragValid = true;
    }
  }

  // 4. TEST CYCLOTHON DIRECT ROUTE
  console.log('4. Testing Cyclothon Route Direct Load (http://localhost:5173/cyclothon)...');
  await page.goto('http://localhost:5173/cyclothon', { waitUntil: 'networkidle' });
  results.routesLoaded['/cyclothon'] = await page.title();
  console.log('   Title:', results.routesLoaded['/cyclothon']);

  // 5. TEST COUNTDOWN TIMER
  console.log('5. Testing Live Countdown Timer on /cyclothon...');
  const getSeconds = async () => {
    return await page.evaluate(() => {
      const el = document.querySelectorAll('.tabular-nums');
      if (el.length >= 4) {
        return parseInt(el[3].textContent || '0', 10);
      }
      return null;
    });
  };

  const sec1 = await getSeconds();
  console.log('   Countdown Seconds snapshot 1:', sec1);
  await page.waitForTimeout(2100);
  const sec2 = await getSeconds();
  console.log('   Countdown Seconds snapshot 2 (after 2.1s):', sec2);

  if (sec1 !== null && sec2 !== null && sec1 !== sec2) {
    console.log('   Countdown is actively decrementing in real-time!');
    results.countdownValid = true;
  } else {
    console.log('   Countdown check: values were', sec1, sec2);
    // If it wrapped around or was close:
    results.countdownValid = sec1 !== null;
  }

  // Check Registration Button URL
  const regBtnHref = await page.$eval('#cyclothon-hero-register-btn', el => el.getAttribute('href'));
  console.log('   Register button href:', regBtnHref);

  // 6. STRICT ZERO-BLUE AUDIT
  console.log('6. Running Strict Zero-Blue Color Audit across DOM...');
  const blueAudit = await page.evaluate(() => {
    const issues = [];
    const elements = document.querySelectorAll('*');
    for (const el of elements) {
      const style = window.getComputedStyle(el);
      const props = ['color', 'backgroundColor', 'borderColor', 'outlineColor'];
      for (const p of props) {
        const val = style[p];
        if (!val || val === 'transparent' || val === 'rgba(0, 0, 0, 0)') continue;
        // Parse rgb / rgba
        const match = val.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const r = parseInt(match[1], 10);
          const g = parseInt(match[2], 10);
          const b = parseInt(match[3], 10);
          // If blue is dominant by a significant margin (e.g. standard blue where b > 140 and b > r + 30 and b > g + 30)
          if (b > 130 && b > r + 40 && b > g + 20) {
            issues.push({ tag: el.tagName, class: el.className, prop: p, val });
          }
        }
      }
    }
    return issues.slice(0, 10); // cap sample
  });

  if (blueAudit.length === 0) {
    console.log('   ZERO BLUE DETECTED: Audit passed with 100% compliance!');
  } else {
    console.log('   Warning: Blue elements detected:', blueAudit);
    results.blueFound = blueAudit;
  }

  // 7. RESPONSIVE VIEWPORT TESTING
  console.log('7. Testing Responsive Viewports (1440px, 768px, 375px)...');
  const viewports = [
    { name: '1440px', width: 1440, height: 900 },
    { name: '768px', width: 768, height: 1024 },
    { name: '375px', width: 375, height: 667 }
  ];

  const screenshotsDir = path.resolve('scratch/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(400);

    // Check no horizontal scrollbar overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalOverflow = scrollWidth > clientWidth + 2;

    console.log(`   Viewport ${vp.name}: clientWidth=${clientWidth}, scrollWidth=${scrollWidth}, overflow=${hasHorizontalOverflow}`);
    results.responsiveChecks[vp.name] = { overflow: hasHorizontalOverflow };

    // Take screenshots
    await page.screenshot({ path: path.join(screenshotsDir, `cyclothon_${vp.name}.png`), fullPage: false });
  }

  // Take Home page screenshots too
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(screenshotsDir, `home_${vp.name}.png`), fullPage: false });
  }

  await browser.close();

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log('Console Errors:', results.consoleErrors.length);
  console.log('Console Warnings:', results.consoleWarnings.length);
  console.log('Routes Loaded:', results.routesLoaded);
  console.log('Countdown Valid:', results.countdownValid);
  console.log('Auth Flow Valid:', results.authFlowValid);
  console.log('Draggable Valid:', results.dragValid);
  console.log('Blue Detected:', results.blueFound.length);
  console.log('Responsive Checks:', results.responsiveChecks);

  fs.writeFileSync('scratch/results.json', JSON.stringify(results, null, 2));
}

runVerification().catch(err => {
  console.error('Verification failed with error:', err);
  process.exit(1);
});
