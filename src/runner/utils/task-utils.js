const fs = require('fs');

const tasksPath = 'src/runner/tasks';

const buildCode = code => `module.exports = ${code}\n`;

const createOrUpdateCode = (id, code) => {
  const moduleCode = buildCode(code);
  fs.writeFile(`${tasksPath}/${id}.js`, moduleCode, (err) => {
    if (err) throw err;
  });
};

const addToIndex = (id) => {
  const requiredString = `module.exports['${id}'] = require('./${id}');\n`;
  fs.appendFile(`${tasksPath}/index.js`, requiredString, (err) => {
    if (err) throw err;
  });
};

const createTask = (id, code) => {
  createOrUpdateCode(id, code);
  addToIndex(id);
};

const updateTask = (id, code) => {
  createOrUpdateCode(id, code);
};

module.exports = { createTask, updateTask };
