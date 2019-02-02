const uniqid = require('uniqid');

const convertParamsToArgs = (params) => {
  const args = [];
  params.forEach((param) => {
    args.push(`--${param.param}`);
    args.push(param.value);
  });
  return args;
};

const buildPuppetArgs = (puppetId, taskId, puppetParams) => [
  '--id', puppetId,
  '--taskId', taskId,
  ...convertParamsToArgs(puppetParams),
];

const puppetRequest = (puppet, type) => {
  const requestId = uniqid();
  puppet.send({ id: requestId, type });
  return new Promise((resolve) => {
    const handleResponse = ({ id, response }) => {
      if (id === requestId) {
        resolve(response);
        puppet.removeListener('message', handleResponse);
      }
    };
    puppet.on('message', handleResponse);
  });
};

module.exports = {
  buildPuppetArgs,
  puppetRequest,
};
