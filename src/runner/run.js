const child_process = require('child_process');
const logger = require('./utils/logger');
const {buildPuppetArgs, getPuppetPath} = require('./utils/run-helper');

class Run {
  constructor(store, runId, puppetTypeName, numberOfPuppets, puppetParams) {
    this.store = store;
    this.id = runId;
    this.puppetTypeName = puppetTypeName;
    this.puppetPath = getPuppetPath(puppetTypeName);
    this.numberOfPuppets = numberOfPuppets;
    this.puppetParams = puppetParams;
    this.puppets = {};
    this.start()
    return;
  }

  async createPuppet() {
    const puppet = await this.store.puppets.create({runId: this.id});
    const puppetArgs = buildPuppetArgs(puppet.id, this.puppetParams)
    console.log(puppetArgs);
    
    const child = child_process.fork(this.puppetPath, puppetArgs, { silent: true });
    child.stdout.on('data', (data) => {
      logger.info(data.toString().slice(0, -1), {runId: this.id, puppetId: puppet.id});
    })
    child.stderr.on('data', (data) => {
      logger.error(data.toString().slice(0, -1), {runId: this.id, puppetId: puppet.id});
    })
    this.addPuppet(puppet.id, child);
  }

  addPuppet(puppetId, child) {
    this.puppets[puppetId] = child;
  }

  async start() {
    logger.info('Run has started', {runId: this.id})
    for (let i = 0; i < this.numberOfPuppets; i++) {
      this.createPuppet()
    }
    logger.info('Run has ended', {runId: this.id})
  }
}

module.exports = Run;
