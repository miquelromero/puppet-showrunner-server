const child_process = require('child_process');
const { ongoingRuns } = require("../mocks/runner");
const { DataSource } = require('apollo-datasource');


class RunsManagerAPI extends DataSource {
  async createRun(config) {
    console.log("I've created a new run");
    const child = child_process.fork('runner/run.js', [], { silent: false });
    runs.push(child);
    return run;
  }

  isOngoing(runId) {
    return ongoingRuns.findIndex((run) => run.id === runId) >= 0;
  }
}

module.exports = RunsManagerAPI;
