const puppetParams = require('minimist')(process.argv.slice(2));

const registerPage = (page) => {
  // Listen to requests from parent (take screenshots, die...)
  process.on('message', async (message) => {
    switch (message) {
      case 'screenshot':
        process.send({
          request: 'screenshot',
          response: await page.screenshot({ encoding: 'base64' }),
        });
        break;
      case 'url':
        process.send({
          request: 'url',
          response: await await page.url(),
        });
        break;
      default:
    }
  });
};

const setState = (state) => {
  process.send({ state });
};

module.exports = {
  registerPage,
  puppetParams,
  setState,
};
