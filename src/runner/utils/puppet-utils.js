const puppetParams = require('minimist')(process.argv.slice(2));

const registerPage = (page) => {
  // Listen to requests from parent (take screenshots, die...)
  process.on('message', (message) => {
    switch(message) {
      case 'screenshot':
        const path = `${puppetParams.id}-${new Date().toISOString()}.png`;
        console.log('saving screenshot to path: ', path)
        // TODO await page.screenshot({path});
        process.send({request: 'screenshot', response: path});
        break;
    }
  })

  // Watch stuff (url changes...) and speak to parent

}

const setStatus = (status) => {
  process.send({status});
}

module.exports = {
  registerPage,
  puppetParams,
  setStatus
}