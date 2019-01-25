const { DataSource } = require('apollo-datasource');

const parseConfigParams = (config) => {
  const puppetParams = JSON.parse(config.puppetParams);
  return { ...config, puppetParams };
};

class DatabaseAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getRun(id) {
    return this.store.runs.findByPk(id);
  }

  async getRuns() {
    return this.store.runs.findAll();
  }

  async getRunsByConfig(configId) {
    return this.store.runs.findAll({
      where: {
        configId,
      },
    });
  }

  async getPuppet(id) {
    return this.store.puppets.findByPk(id);
  }

  async getPuppetsByRun(runId) {
    return this.store.puppets.findAll({
      where: {
        runId,
      },
    });
  }

  async getConfigs() {
    const configs = await this.store.configs.findAll();
    return configs.map(parseConfigParams);
  }

  async getConfig(id) {
    const config = await this.store.configs.findByPk(id);
    return parseConfigParams(config);
  }

  async createConfig({ puppetTypeName, numberOfPuppets, puppetParams }) {
    const config = await this.store.configs.create({
      puppetTypeName,
      numberOfPuppets,
      puppetParams: JSON.stringify(puppetParams),
    });
    return parseConfigParams(config);
  }

  async createRun(configId) {
    return this.store.runs.create({
      configId,
    });
  }
}

module.exports = DatabaseAPI;
