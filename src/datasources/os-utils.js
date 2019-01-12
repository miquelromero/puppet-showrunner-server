const { DataSource } = require('apollo-datasource');
const os = require('os-utils');
const { promisify } = require('util');

os.cpuUsage[promisify.custom] = () => new Promise(os.cpuUsage);
os.cpuFree[promisify.custom] = () => new Promise(os.cpuFree);
const cpuUsage = promisify(os.cpuUsage);
const cpuFree = promisify(os.cpuFree);

class OsUtilsAPI extends DataSource {
  static getPlatform() {
    return os.platform();
  }

  static getCpuCount() {
    return os.cpuCount();
  }

  static async getCpuUsage() {
    return cpuUsage();
  }

  static async getCpuFree() {
    return cpuFree();
  }

  static getFreemem() {
    return os.freemem();
  }

  static getTotalmem() {
    return os.totalmem();
  }

  static getFreememPercentage() {
    return os.freememPercentage();
  }

  static getSysUptime() {
    return os.sysUptime();
  }

  static getProcessUptime() {
    return os.processUptime();
  }
}

module.exports = OsUtilsAPI;
