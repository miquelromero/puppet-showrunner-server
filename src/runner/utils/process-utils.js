const puppetParams = require('minimist')(process.argv.slice(2));

const registerPage = (page) => {
  // Listen to requests from parent (take screenshots, die...)
  process.on('message', async ({ id, type }) => {
    switch (type) {
      case 'screenshot':
        process.send({
          id,
          response: await page.screenshot({ encoding: 'base64' }),
        });
        break;
      case 'url':
        process.send({
          id,
          response: await page.url(),
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
