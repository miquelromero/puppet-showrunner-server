module.exports = {
  Query: {
    puppets: async (root, { runId }, { dataSources }) => dataSources
      .databaseAPI.getPuppetsByRun(runId),
    runs: async (root, _args, { dataSources }) => dataSources.databaseAPI.getRuns(),
    run: async (root, { id }, { dataSources }) => dataSources.databaseAPI.getRun(id),
    stats: () => true, // TODO: Find a better way of doing this
    tasks: async (root, _args, { dataSources }) => dataSources.databaseAPI.getTasks(),
    logs: (root, _args, { dataSources }) => dataSources.logsAPI.getLogs(),
    screenshot: async (root, { puppetId }, { dataSources }) => dataSources
      .runnerAPI.getScreenshot(puppetId),
  },
  Mutation: {
    createRun: async (_, config, { dataSources }) => {
      const createdRun = await dataSources.databaseAPI.createRun(config);
      dataSources.runnerAPI.createRun(createdRun);
      return createdRun;
    },
    createRunFromPrevious: async (_, { runId }, { dataSources }) => {
      const createdRun = await dataSources.databaseAPI.createRunFromPrevious(runId);
      dataSources.runnerAPI.createRun(createdRun);
      return createdRun;
    },
    createTask: async (_, config, { dataSources }) => dataSources
      .databaseAPI.createTask(config),
    updateTask: async (_, config, { dataSources }) => dataSources
      .databaseAPI.updateTask(config),
  },
  Run: {
    puppets: async (run, _args, { dataSources }) => dataSources.databaseAPI.getPuppetsByRun(run.id),
    isOngoing: (run, _args, { dataSources }) => dataSources.runnerAPI.isRunOngoing(run.id),
    logs: (run, _args, { dataSources }) => dataSources.logsAPI.getLogsByRun(run.id),
    task: async (run, _args, { dataSources }) => dataSources
      .databaseAPI.getTask(run.taskId),
  },
  Puppet: {
    run: async (puppet, _args, { dataSources }) => dataSources.databaseAPI.getRun(puppet.runId),
    isOngoing: (puppet, _args, { dataSources }) => dataSources.runnerAPI.isPuppetOngoing(puppet.id),
    logs: (puppet, _args, { dataSources }) => dataSources.logsAPI.getLogsByPuppet(puppet.id),
    url: async (puppet, _args, { dataSources }) => dataSources.runnerAPI.getUrl(puppet.id),
  },
  Stats: {
    platform: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getPlatform(),
    cpuCount: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getCpuCount(),
    cpuUsage: async (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getCpuUsage(),
    cpuFree: async (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getCpuFree(),
    freemem: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getFreemem(),
    totalmem: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getTotalmem(),
    freememPercentage: (_source, _args, { dataSources }) => dataSources
      .osUtilsAPI.getFreememPercentage(),
    sysUptime: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getSysUptime(),
    processUptime: (_source, _args, { dataSources }) => dataSources.osUtilsAPI.getProcessUptime(),
  },
  Log: {
    puppet: async (log, _args, { dataSources }) => dataSources.databaseAPI.getPuppet(log.puppetId),
    run: async (log, _args, { dataSources }) => dataSources.databaseAPI.getRun(log.runId),
  },
};
