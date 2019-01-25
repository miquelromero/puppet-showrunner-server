const uniqid = require('uniqid');

const convertParamsToArgs = (params) => {
  let args = [];
  params.forEach((param) => {
    args.push('--' + param.param);
    args.push('' + param.value);
  })
  return args;
}

const buildPuppetArgs = (puppetId, puppetParams) => {
  return [
    '--id', puppetId,
    ...convertParamsToArgs(puppetParams)
  ]
}

const getPuppetPath = (puppetTypeName) => {
  return 'src/runner/puppets/' + puppetTypeName + '.js';
}

const puppetRequest = (puppet, type) => {
  const requestId = uniqid()
  puppet.send({id: requestId, type});
  return new Promise((resolve) => {
    const handleResponse = ({id, response}) => {
      if (id === requestId) {
        resolve(response)
        puppet.removeListener("message", handleResponse)
      }
    }
    puppet.on("message", handleResponse)
  });
}

module.exports = {
  buildPuppetArgs,
  getPuppetPath,
  puppetRequest
}
