const SQL = require('sequelize');

module.exports.createStore = () => {
  const { Op } = SQL;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });

  const runs = db.define('run', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numberOfPuppets: SQL.INTEGER,
    taskId: SQL.INTEGER,
    puppetParams: {
      type: SQL.TEXT,
      get() { return JSON.parse(this.getDataValue('puppetParams')); },
      set(value) { this.setDataValue('puppetParams', JSON.stringify(value)); },
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
  });

  const puppets = db.define('puppet', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    runId: SQL.INTEGER,
    state: SQL.STRING,
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
  });

  const tasks = db.define('task', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: SQL.TEXT,
    description: SQL.TEXT,
    params: {
      type: SQL.TEXT,
      get() { return JSON.parse(this.getDataValue('params')); },
      set(value) { this.setDataValue('params', JSON.stringify(value)); },
    },
    code: SQL.TEXT,
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
  });

  const ongoingRuns = {};

  const ongoingPuppets = {};

  return {
    puppets,
    runs,
    tasks,
    ongoingRuns,
    ongoingPuppets,
  };
};
