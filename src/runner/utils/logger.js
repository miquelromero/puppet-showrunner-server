const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp } = format;

const transport = new (transports.DailyRotateFile)({
  filename: '%DATE%.log',
  dirname: 'logs',
  logs: '%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = createLogger({
  format: combine(
    timestamp(),
    format.json(),
  ),
  transports: [
    transport,
  ],
});

module.exports = logger;
