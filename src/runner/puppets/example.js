const puppeteer = require('puppeteer');
const { registerPage, puppetParams, setState } = require('../utils/process-utils');

try {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    registerPage(page);
    setState('working');
    await page.goto('https://www.google.com');
    await page.type('input[name=q]', puppetParams.query);
    await page.keyboard.press('Enter');
    setState('idle');
  })();
} catch (err) {
  console.error(err);
}
