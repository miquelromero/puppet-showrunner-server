const child_process = require('child_process');
const { DataSource } = require('apollo-datasource');

const configToArgs = (config) => {
  runnerConfig = {
    puppetTypeName: config.puppetTypeName,
    numberOfPuppets: config.numberOfPuppets,
    maxWorkingPuppets: config.maxWorkingPuppets,
    puppetParams: JSON.stringify(config.puppetParams)
  }
  let args = [];
  for (let [key, value] of Object.entries(runnerConfig)) {
    args.push('--' + key);
    args.push('' + value);
  };
  return args;
}

class RunsManagerAPI extends DataSource {

  constructor({ store }) {
    super();
    this.store = store;
  }

  async createPuppet(runId) {
    return await this.store.puppets.create({runId});
  }

  async createRun(runId, config) {
    const args = configToArgs(config);
    const child = child_process.fork('src/runner/run.js', args, { silent: false });
    child.on('message', async (message) => {
      console.log('child says:', message);
      if (message.type === 'createPuppet') {
        const createdPuppet = await this.createPuppet(runId);
        child.send({type: 'puppetCreated', puppetId: message.puppetId, id: createdPuppet.id})
      }
    });
    this.store.ongoingRuns[runId] = child;
    return child;
  }

  isOngoing(runId) {
    return this.store.ongoingRuns[runId] != null;
  }
}

module.exports = RunsManagerAPI;
