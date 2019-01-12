const { fork } = require('child_process');
const logger = require('./utils/logger');
const { buildPuppetArgs, getPuppetPath, puppetRequest } = require('./utils/puppet-utils');

class Puppet {
  constructor(store, puppetId, runId, puppetTypeName, puppetParams) {
    this.store = store;
    this.id = puppetId;
    this.runId = runId;
    this.puppetTypeName = puppetTypeName;
    this.puppetPath = getPuppetPath(puppetTypeName);
    this.puppetParams = puppetParams;
    this.process = null;
  }

  async start() {
    this.store.ongoingPuppets[this.id] = this;
    const puppetArgs = buildPuppetArgs(this.id, this.puppetParams);
    this.process = fork(this.puppetPath, puppetArgs, { silent: true });
    this.listenToLogs();
    this.listenToMessages();
  }

  listenToLogs() {
    this.process.stdout.on('data', (data) => {
      logger.info(data.toString().slice(0, -1), { runId: this.runId, puppetId: this.id });
    });
    this.process.stderr.on('data', (data) => {
      logger.error(data.toString().slice(0, -1), { runId: this.runId, puppetId: this.id });
    });
  }

  listenToMessages() {
    this.process.on('message', async (message) => {
      const puppet = await this.store.puppets.findByPk(this.id);
      puppet.update({ state: message.state });
    });
  }

  async getScreenshot() {
    return puppetRequest(this.process, 'screenshot');
  }

  async getUrl() {
    return puppetRequest(this.process, 'url');
  }
}

module.exports = Puppet;
