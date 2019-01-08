// TODO: This is a puppet example which should visit a website and just stay there
// It should also tell its parent to change status and url in the database when necessary.
const argv = require('minimist')(process.argv.slice(2));

console.log("Puppet started with following arguments", argv);
