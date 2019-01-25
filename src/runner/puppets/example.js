const {registerPage, puppetParams, setState} = require('../utils/process-utils');
const puppeteer = require('puppeteer');

try {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    registerPage(page);
    setState('working')
    await page.goto('https://www.google.com');
    await page.type('input[name=q]', puppetParams.query);
    await page.keyboard.press('Enter');
    setState('idle');
  })() 
} catch (err) {
  console.error(err)
}
