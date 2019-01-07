const { DataSource } = require('apollo-datasource');
const fs = require('fs');
const readline = require('readline');

const readLogs = (filterFn) => {
  let logs = []
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
}

class LogsAPI extends DataSource {

  getLogs() {
    const filterFn = (log) => true;
    return readLogs(filterFn);
  }

  getLogsByRun(runId) {
    const filterFn = (log) => log.runId == runId;
    return readLogs(filterFn);
  }

  getLogsByPuppet(puppetId) {
    const filterFn = (log) => log.puppetId == puppetId;
    return readLogs(filterFn);
  }
}

module.exports = LogsAPI;
