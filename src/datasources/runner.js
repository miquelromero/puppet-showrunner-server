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

  getPuppet(puppetId) {
    return this.store.ongoingPuppets[puppetId];
  }
  
  getScreenshot(puppetId) {
    const puppet = this.getPuppet(puppetId);
    return puppet != null ? puppet.getScreenshot() : null
  }

  getUrl(puppetId) {
    const puppet = this.getPuppet(puppetId);
    console.log('puppet')
    return puppet != null ? puppet.puppet.getUrl() : null
  }

  createRun(runId, { puppetTypeName, numberOfPuppets, puppetParams }) {
    const strategy = 'SimpleRun';
    const run = new runs[strategy](this.store, runId, puppetTypeName, numberOfPuppets, puppetParams);
    run.start();
  }

  isRunOngoing(runId) {
    return this.getRun(runId) != null;
  }

  isPuppetOngoing(puppetId) {
    return this.getPuppet(puppetId) != null;
  }
}

module.exports = RunnerAPI;
