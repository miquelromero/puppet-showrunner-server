const Run = require('../run')

class SimpleRun extends Run {
  async runStrategy() {
    for (let i = 0; i < this.numberOfPuppets; i++) {
      this.createPuppet()
    }
  }
}

module.exports = SimpleRun;
