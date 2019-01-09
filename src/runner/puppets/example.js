const {registerPage, puppetParams, setStatus} = require('../utils/process-utils');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  registerPage(page);
  try {
    await page.goto('https://www.google.com');
    await page.type('input[name=q]', puppetParams.query);
    await page.click('input[name=btnK]');
  } catch {}
})();
