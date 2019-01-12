const convertParamsToArgs = (params) => {
  const args = [];
  params.forEach((param) => {
    args.push(`--${param.param}`);
    args.push(param.value);
  });
  return args;
};

const buildPuppetArgs = (puppetId, puppetParams) => [
  '--id', puppetId,
  ...convertParamsToArgs(puppetParams),
];

const getPuppetPath = puppetTypeName => `src/runner/puppets/${puppetTypeName}.js`;

const puppetRequest = (puppet, request) => {
  puppet.send(request);
  return new Promise((resolve) => {
    puppet.on('message', (message) => {
      if (message.request === request) {
        resolve(message.response);
      }
    });
  });
};

module.exports = {
  buildPuppetArgs,
  getPuppetPath,
  puppetRequest,
};
