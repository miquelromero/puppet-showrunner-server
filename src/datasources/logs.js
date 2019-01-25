const { DataSource } = require('apollo-datasource');

const readLogs = () => {
  const logs = [];
  /* TODO: Implement log files reader
  const instream = fs.createReadStream('logs/2019-01-06.log');
  const rl = readline.createInterface({input: instream});
  rl.on('line', function(line) {
    const log = JSON.parse(line);
    if (filterFn(log)) {
      logs.push(log)
    }
  });
  */
  return logs;
};

class LogsAPI extends DataSource {
  static getLogs() {
    const filterFn = () => true;
    return readLogs(filterFn);
  }

  static getLogsByRun(runId) {
    const filterFn = log => log.runId === runId;
    return readLogs(filterFn);
  }

  static getLogsByPuppet(puppetId) {
    const filterFn = log => log.puppetId === puppetId;
    return readLogs(filterFn);
  }
}

module.exports = LogsAPI;
