const child_process = require('child_process');
const logger = require('./utils/logger');
const {buildPuppetArgs, getPuppetPath, puppetRequest} = require('./utils/run-utils');

class Run {
  constructor(store, runId, puppetTypeName, numberOfPuppets, puppetParams) {
    this.store = store;
    this.id = runId;
    this.puppetTypeName = puppetTypeName;
    this.puppetPath = getPuppetPath(puppetTypeName);
    this.numberOfPuppets = numberOfPuppets;
    this.puppetParams = puppetParams;
    this.puppets = {};
  }

  async runStrategy() {
    throw "This method needs to be implemented by a subclass";
  }
  
  async createPuppet() {
    const puppet = await this.store.puppets.create({runId: this.id});
    const puppetArgs = buildPuppetArgs(puppet.id, this.puppetParams)
    
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

  getPuppet(puppetId) {
    return this.puppets[puppetId];
  }

  async start() {
    logger.info('Run has started', {runId: this.id})
    this.runStrategy();
    logger.info('Run has ended', {runId: this.id})
  }

  async getScreenshot(puppetId) {
    const puppet = this.getPuppet(puppetId);
    return await puppetRequest(puppet, 'screenshot');
  }
}

module.exports = Run;
