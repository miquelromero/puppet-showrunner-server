const { DataSource } = require('apollo-datasource');
const Run = require('../runner/run')

class RunsManagerAPI extends DataSource {

  constructor({ store }) {
    super();
    this.store = store;
  }

  async createPuppet(runId) {
    return await this.store.puppets.create({runId});
  }

  async createRun(runId, {puppetTypeName, numberOfPuppets, puppetParams}) {
    this.store.ongoingRuns[runId] = new Run(this.store, runId, puppetTypeName, numberOfPuppets, puppetParams);
  }

  isOngoing(runId) {
    return this.store.ongoingRuns[runId] != null;
  }
}

module.exports = RunsManagerAPI;
