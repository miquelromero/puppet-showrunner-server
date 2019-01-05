const { DataSource } = require('apollo-datasource');
const { runs, configs, puppets } = require("../mocks/database");

class DatabaseAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  getRun(id) {
    return runs.find((run) => run.id == id);
  }

  getRuns() {
    return runs;
  }

  getRunsByConfig(configId) {
    return runs.filter((run) => run.configId == configId);
  }

  getPuppet(id) {
    return puppets.find((puppet) => puppet.id == id);
  }

  getPuppetsByRun(runId) {
    return puppets.filter((puppet) => puppet.runId == runId);
  }

  getConfigs() {
    return configs;
  }

  getConfig(id) {
    return configs.find((config) => config.id == id);
  }
}

module.exports = DatabaseAPI;
