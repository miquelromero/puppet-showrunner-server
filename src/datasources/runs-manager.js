const { DataSource } = require('apollo-datasource');
const runs = require('../runner/runs')

class RunsManagerAPI extends DataSource {

  constructor({ store }) {
    super();
    this.store = store;
  }

  async createPuppet(runId) {
    return await this.store.puppets.create({runId});
  }

  getRun(runId) {
    return this.store.ongoingRuns[runId];
  }

  async createRun(runId, {puppetTypeName, numberOfPuppets, puppetParams}) {
    const strategy = 'SimpleRun';
    const run = new runs[strategy](this.store, runId, puppetTypeName, numberOfPuppets, puppetParams);
    this.store.ongoingRuns[runId] = run;
    run.start();
  }

  isOngoing(runId) {
    return this.store.ongoingRuns[runId] != null;
  }
}

module.exports = RunsManagerAPI;
