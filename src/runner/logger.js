const { createLogger, format, transports } = require('winston');
const { combine, timestamp } = format;
require('winston-daily-rotate-file');

var transport = new (transports.DailyRotateFile)({
  filename: '%DATE%.log',
  dirname: 'logs',
  logs: '%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

var logger = createLogger({
  format: combine(
    timestamp(),
    format.json()
  ),
  transports: [
    transport
  ]
});

module.exports = logger;