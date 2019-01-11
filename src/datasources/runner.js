const { DataSource } = require('apollo-datasource');
const runs = require('../runner/runs')

class RunnerAPI extends DataSource {

  constructor({ store }) {
    super();
    this.store = store;
  }

  getRun(runId) {
    return this.store.ongoingRuns[runId];
  }
  
  getScreenshot(puppetId) {
    const puppet = this.store.ongoingPuppets[puppetId];
    return puppet != null ? puppet.getScreenshot() : null
  }

  getUrl(puppetId) {
    const puppet = this.store.ongoingPuppets[puppetId];
    return puppet != null ? puppet.puppet.getUrl() : null
  }

  createRun(runId, {puppetTypeName, numberOfPuppets, puppetParams}) {
    const strategy = 'SimpleRun';
    const run = new runs[strategy](this.store, runId, puppetTypeName, numberOfPuppets, puppetParams);
    run.start();
  }

  isRunOngoing(runId) {
    return this.store.ongoingRuns[runId] != null;
  }

  isPuppetOngoing(puppetId) {
    return this.store.ongoingPuppets[puppetId] != null;
  }
}

module.exports = RunnerAPI;
