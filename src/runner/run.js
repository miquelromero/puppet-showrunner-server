const child_process = require('child_process');
const argv = require('minimist')(process.argv.slice(2));

const puppetParamsToArgs = (puppetParams) => {
  params = JSON.parse(puppetParams);
  let args = [];
  params.forEach((param) => {
    args.push('--' + param.param);
    args.push('' + param.value);
  })
  return args;
}

const { puppetTypeName, numberOfPuppets, maxWorkingPuppets, puppetParams } = argv;

const puppetPath = 'src/runner/puppets/' + puppetTypeName + '.js';
const puppetArgs = puppetParamsToArgs(puppetParams);

for (let i = 0; i <= numberOfPuppets; i++) {
  // TODO: Add it to database somehow and listen to its changes
  child_process.fork(puppetPath, puppetArgs, { silent: false });
}
