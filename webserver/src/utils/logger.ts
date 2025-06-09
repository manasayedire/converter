import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
/*
 * Winston logger for the roman numeral converter
 * @param level - The log level
 * @param format - The log format
 * @param transports - The log transports
 * @returns The logger
 */
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({ level: 'info' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
export default logger;
