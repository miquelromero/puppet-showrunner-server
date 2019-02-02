const fs = require('fs');

const tasksPath = 'src/runner/tasks';

const registerTask = (id, code) => {
  const moduleCode = `module.exports = ${code}\n`;
  fs.writeFile(`${tasksPath}/${id}.js`, moduleCode, (err) => {
    if (err) throw err;
  });
  const requiredString = `module.exports['${id}'] = require('./${id}');\n`;
  fs.appendFile(`${tasksPath}/index.js`, requiredString, (err) => {
    if (err) throw err;
  });
};

module.exports = { registerTask };
