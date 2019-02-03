const puppeteer = require('puppeteer');
const {
  registerPage, processArguments, setState,
} = require('../utils/process-utils');
const tasks = require('../tasks');

try {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    registerPage(page);
    const {
      _,
      id,
      taskId,
      ...puppetParams
    } = processArguments;
    const task = tasks[taskId];
    task(browser, page, puppetParams, setState);
  })();
} catch (err) {
  console.error(err);
}
