const { DataSource } = require('apollo-datasource');
const { createTask, updateTask } = require('../runner/utils/task-utils');

class DatabaseAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getRun(id) {
    return this.store.runs.findByPk(id);
  }

  async getRuns() {
    return this.store.runs.findAll();
  }

  async getTask(id) {
    return this.store.tasks.findByPk(id);
  }

  async getTasks() {
    return this.store.tasks.findAll();
  }

  async getPuppet(id) {
    return this.store.puppets.findByPk(id);
  }

  async getPuppetsByRun(runId) {
    return this.store.puppets.findAll({
      where: {
        runId,
      },
    });
  }

  async createRunFromPrevious(runId) {
    const {
      task,
      numberOfPuppets,
      puppetParams,
    } = await this.getRun(runId);
    return this.store.runs.create({
      task,
      numberOfPuppets,
      puppetParams,
    });
  }

  async createRun({ taskId, numberOfPuppets, puppetParams }) {
    return this.store.runs.create({
      taskId,
      numberOfPuppets,
      puppetParams,
    });
  }

  async createTask({
    name, title, description, params, code,
  }) {
    const task = await this.store.tasks.create({
      name,
      title,
      description,
      params,
    });
    createTask(task.id, code);
    return task;
  }

  async updateTask({
    id, name, title, description, params, code,
  }) {
    let task = await this.store.tasks.findByPk(id);
    task = await task.update({
      name,
      title,
      description,
      params,
    });
    updateTask(task.id, code);
    return task;
  }
}

module.exports = DatabaseAPI;
