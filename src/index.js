const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const DatabaseAPI = require('./datasources/database');
const RunnerAPI = require('./datasources/runner');
const OsUtilsAPI = require('./datasources/os-utils');
const LogsAPI = require('./datasources/logs');
const { createStore } = require('./store');

// creates a database connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
  databaseAPI: new DatabaseAPI({ store }),
  runnerAPI: new RunnerAPI({ store }),
  osUtilsAPI: new OsUtilsAPI(),
  logsAPI: new LogsAPI(),
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

// Initialization
dataSources().databaseAPI.init();

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`));
}
