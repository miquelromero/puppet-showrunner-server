const { DataSource } = require('apollo-datasource');
const runs = require('../runner/runs');

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
    return puppet != null ? puppet.getScreenshot() : null;
  }

  getUrl(puppetId) {
    const puppet = this.getPuppet(puppetId);
    return puppet != null ? puppet.getUrl() : null;
  }

  createRun(runEntity) {
    const strategy = 'SimpleRun';
    const {
      id,
      taskId,
      numberOfPuppets,
      puppetParams,
    } = runEntity;
    const run = new runs[strategy](this.store, id, taskId, numberOfPuppets, puppetParams);
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
