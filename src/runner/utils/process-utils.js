const puppetParams = require('minimist')(process.argv.slice(2));

const registerPage = (page) => {
  // Listen to requests from parent (take screenshots, die...)
  process.on('message', async ({id, type}) => {
    switch(type) {
      case 'screenshot':
        const screenshot = await page.screenshot({encoding: 'base64'});
        process.send({id, response: screenshot});
        break;
      case 'url':
        const url = await page.url();
        process.send({id, response: url});
        break;
    }
  });
}

const setState = (state) => {
  process.send({state});
}

module.exports = {
  registerPage,
  puppetParams,
  setState
}