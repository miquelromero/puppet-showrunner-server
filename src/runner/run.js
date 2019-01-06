const child_process = require('child_process');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));

const { runId, puppetTypeName, numberOfPuppets, maxWorkingPuppets, puppetParams } = argv;

const puppetParamsToArgs = (puppetParams) => {
  params = JSON.parse(puppetParams);
  let args = [];
  params.forEach((param) => {
    args.push('--' + param.param);
    args.push('' + param.value);
  })
  return args;
}

const loggerMeta = {
  run: runId
}

logger.info('Run has started', loggerMeta)

const puppets = {}

const puppetPath = 'src/runner/puppets/' + puppetTypeName + '.js';
const puppetArgs = puppetParamsToArgs(puppetParams);
for (let i = 0; i < numberOfPuppets; i++) {
  let puppetInternalId = i;
  process.send({type: 'createPuppet', puppetInternalId: puppetInternalId});
  process.on('message', (message) => {
    if (message.type === 'puppetCreated' && message.puppetInternalId == puppetInternalId) {
      const puppetId = message.puppetId;
      child = child_process.fork(puppetPath, puppetArgs, { silent: true });
      child.stdout.on('data', (data) => {
        logger.info(data.toString().slice(0, -1), {...loggerMeta, puppet: puppetId});
      })
      child.stderr.on('data', (data) => {
        logger.error(data.toString().slice(0, -1), {...loggerMeta, puppet: puppetId});
      })
      puppets[puppetId] = child;
    }
  })
}

logger.info('Run has ended', loggerMeta)
