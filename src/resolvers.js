const { puppetTypes } = require("./mocks/puppet-types");

module.exports = {
  Query: {
    puppets: (root, { runId }, { dataSources }) => dataSources.databaseAPI.getPuppetsByRun(runId),
    runs: (root, _args, { dataSources }) => dataSources.databaseAPI.getRuns(),
    run: (root, { id }, { dataSources }) => dataSources.databaseAPI.getRun(id),
    stats: (root, _args, context) => true, // TODO: Find a better way of doing this
    puppetTypes: (root, _args, context) => puppetTypes
  },
  Mutation: {
    createRun: async (_, { puppetType, numberOfPuppets, maxWorkingPuppets, puppetParams }, { dataSources }) => {
      // TODO
      // Database: Create the config and the run
      // Runner: Start a run with the provided config
    },
    createRunByConfig: async (_, { configId }, { dataSources }) => {
      // TODO
      // Database: Get the config, create the run
      // Runner: Start a run with the provided config
    }
  },
  Run: {
    puppets: (run, _args, { dataSources }) => dataSources.databaseAPI.getPuppetsByRun(run.id),
    config: (run, _args, { dataSources }) => dataSources.databaseAPI.getConfig(run.configId),
    isOngoing: (run, _args, { dataSources }) => dataSources.runsManagerAPI.isOngoing(run.id),
  },
  Puppet: {
    run: (puppet, _args, { dataSources }) => dataSources.databaseAPI.getRun(puppet.runId)
  },
  Config: {
    runs: (config, _args, { dataSources }) => dataSources.databaseAPI.getRunsByConfig(config.id),
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
  }
}
