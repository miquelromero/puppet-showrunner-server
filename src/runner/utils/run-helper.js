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

module.exports = {
  buildPuppetArgs,
  getPuppetPath
}
