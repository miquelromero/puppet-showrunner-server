const { puppetTypes } = require("./mocks/puppet-types");

module.exports = {
  Query: {
    puppets: async (root, { runId }, { dataSources }) => dataSources.databaseAPI.getPuppetsByRun(runId),
    runs: async (root, _args, { dataSources }) => dataSources.databaseAPI.getRuns(),
    run: async (root, { id }, { dataSources }) => dataSources.databaseAPI.getRun(id),
    stats: (root, _args, context) => true, // TODO: Find a better way of doing this
    puppetTypes: (root, _args, context) => puppetTypes,
    logs: (root, _args, { dataSources }) => dataSources.logsAPI.getLogs(),
    screenshot: async (root, { puppetId }, { dataSources }) => await dataSources.runnerAPI.getScreenshot(puppetId)
  },
  Mutation: {
    createRun: async (_, config, { dataSources }) => {
      const createdConfig = await dataSources.databaseAPI.createConfig(config);
      // TODO: Error handling
      const createdRun = await dataSources.databaseAPI.createRun(createdConfig.id);
      // TODO: Error handling
      dataSources.runnerAPI.createRun(createdRun.id, createdConfig);
      return createdRun;
    },
    createRunByConfig: async (_, { configId }, { dataSources }) => {
      const obtainedConfig = await dataSources.databaseAPI.getConfig(configId);
      // TODO: Error handling
      const createdRun = await dataSources.databaseAPI.createRun(obtainedConfig.id);
      // TODO: Error handling
      dataSources.runnerAPI.createRun(createdRun.id, obtainedConfig);
      return createdRun;
    }
  },
  Run: {
    puppets: async (run, _args, { dataSources }) => dataSources.databaseAPI.getPuppetsByRun(run.id),
    config: async (run, _args, { dataSources }) => dataSources.databaseAPI.getConfig(run.configId),
    isOngoing: (run, _args, { dataSources }) => dataSources.runnerAPI.isRunOngoing(run.id),
    logs: (run, _args, { dataSources }) => dataSources.logsAPI.getLogsByRun(run.id)
  },
  Puppet: {
    run: async (puppet, _args, { dataSources }) => dataSources.databaseAPI.getRun(puppet.runId),
    isOngoing: (puppet, _args, { dataSources }) => dataSources.runnerAPI.isPuppetOngoing(puppet.id),
    logs: (puppet, _args, { dataSources }) => dataSources.logsAPI.getLogsByPuppet(puppet.id),
    url: async (puppet, _args, { dataSources }) => await dataSources.runnerAPI.getUrl(puppet.id)
  },
  Config: {
    runs: async (config, _args, { dataSources }) => dataSources.databaseAPI.getRunsByConfig(config.id),
    puppetType: (config, _args) => puppetTypes.find(pType => pType.name === config.puppetTypeName)
  },
  Stats: {
    platform: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getPlatform(),
    cpuCount: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getCpuCount(),
    cpuUsage: async (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getCpuUsage(),
    cpuFree: async (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getCpuFree(),
    freemem: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getFreemem(),
    totalmem: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getTotalmem(),
    freememPercentage: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getFreememPercentage(),
    sysUptime: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getSysUptime(),
    processUptime: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getProcessUptime()
  },
  Log: {
    puppet: async (log, _args, { dataSources }) => dataSources.databaseAPI.getPuppet(log.puppetId),
    run: async (log, _args, { dataSources }) => dataSources.databaseAPI.getRun(log.runId)
  }
}
