const logger = require('./utils/logger');
const Puppet = require('./puppet');

class Run {
  constructor(store, runId, puppetTypeName, numberOfPuppets, puppetParams) {
    this.store = store;
    this.id = runId;
    this.puppetTypeName = puppetTypeName;
    this.numberOfPuppets = numberOfPuppets;
    this.puppetParams = puppetParams;
    this.puppets = {};
  }

  static async runStrategy() {
    throw new Error('This method needs to be implemented by a subclass');
  }

  async createPuppet() {
    const dbPuppet = await this.store.puppets.create({ runId: this.id });
    const puppet = new Puppet(this.store, dbPuppet.id, this.id, this.puppetTypeName,
      this.puppetParams);
    puppet.start();
    this.addPuppet(puppet.id, puppet);
  }

  addPuppet(puppetId, puppet) {
    this.puppets[puppetId] = puppet;
  }

  getPuppet(puppetId) {
    return this.puppets[puppetId];
  }

  async start() {
    this.store.ongoingRuns[this.id] = this;
    logger.info('Run has started', { runId: this.id });
    this.runStrategy();
    logger.info('Run has ended', { runId: this.id });
  }
}

module.exports = Run;
