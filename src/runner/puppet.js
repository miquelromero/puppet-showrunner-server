const { fork } = require('child_process');
const logger = require('./utils/logger');
const { buildPuppetArgs, puppetRequest } = require('./utils/puppet-utils');

const basePuppetPath = 'src/runner/puppets/base.js';

class Puppet {
  constructor(store, puppetId, runId, taskId, puppetParams) {
    this.store = store;
    this.id = puppetId;
    this.runId = runId;
    this.taskId = taskId;
    this.puppetParams = puppetParams;
    this.process = null;
  }

  async start() {
    this.store.ongoingPuppets[this.id] = this;
    const puppetArgs = buildPuppetArgs(this.id, this.taskId, this.puppetParams);
    this.process = fork(basePuppetPath, puppetArgs, { silent: true });
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
