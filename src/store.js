const SQL = require('sequelize');

module.exports.createStore = () => {
  const Op = SQL.Op;
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
    configId: SQL.INTEGER,
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE
  });

  const configs = db.define('config', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numberOfPuppets: SQL.INTEGER,
    maxWorkingPuppets: SQL.INTEGER,
    puppetTypeName: SQL.STRING,
    puppetParams: SQL.TEXT,
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE
  });

  const puppets = db.define('puppet', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    runId: SQL.INTEGER,
    url: SQL.STRING,
    state: SQL.STRING,
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE
  });

  const ongoingRuns = {}

  return {
    puppets,
    runs,
    configs,
    ongoingRuns
  }
};