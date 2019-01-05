const { DataSource } = require('apollo-datasource');
const os = require('os-utils');
const { promisify } = require('util');

os.cpuUsage[promisify.custom] = () => new Promise(os.cpuUsage);
os.cpuFree[promisify.custom] = () => new Promise(os.cpuFree);
const cpuUsage = promisify(os.cpuUsage)
const cpuFree = promisify(os.cpuFree)

class OsUtilsAPI extends DataSource {
  getPlatform() {
    return os.platform();
  };

  getCpuCount() {
    return os.cpuCount();
  };

  async getCpuUsage() {
    return await cpuUsage()
  };

  async getCpuFree() {
    return await cpuFree()
  };

  getFreemem() {
    return os.freemem();
  };

  getTotalmem() {
    return os.totalmem();
  };

  getFreememPercentage() {
    return os.freememPercentage();
  };

  getSysUptime() {
    return os.sysUptime();
  };

  getProcessUptime() {
    return os.processUptime();
  };
}

module.exports = OsUtilsAPI;
