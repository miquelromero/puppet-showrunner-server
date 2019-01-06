const { DataSource } = require('apollo-datasource');

const parseConfigParams = (config) => {
  config.puppetParams = JSON.parse(config.puppetParams);
  return config;
}

class DatabaseAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getRun(id) {
    return await this.store.runs.findByPk(id);
  }

  async getRuns() {
    return await this.store.runs.findAll();
  }

  async getRunsByConfig(configId) {
    return await this.store.runs.findAll({where: {
      configId: configId
    }});
  }

  async getPuppet(id) {
    return await this.store.puppets.findByPk(id);
  }

  async getPuppetsByRun(runId) {
    return this.store.puppets.findAll({where: {
      runId: runId
    }});
  }
  async getConfigs() {
    const configs = await this.store.configs.findAll();
    return configs.map(parseConfigParams)
  }

  async getConfig(id) {
    const config = await this.store.configs.findByPk(id);
    return parseConfigParams(config);
  }

  async createConfig({ puppetTypeName, numberOfPuppets, maxWorkingPuppets, puppetParams }) {
    const config = await this.store.configs.create({
      puppetTypeName,
      numberOfPuppets,
      maxWorkingPuppets,
      puppetParams: JSON.stringify(puppetParams)
    })
    return parseConfigParams(config);
  }

  async createRun(configId) {
    return await this.store.runs.create({
      configId
    })
  }
}

module.exports = DatabaseAPI;
