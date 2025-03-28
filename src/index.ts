import fs from 'fs';
import ms from 'ms';

enum LogType {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR/FATAL'
}

let currentLogFile = `./logs/${new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-')}.log`;
let lastLogTime = Date.now();

if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');

// Every 5 min check to make a new log
setInterval(() => {
  currentLogFile = `./logs/${getDate().replace(/\//g, '-')}.log`;
}, 5 * 60 * 1000);

const logInfo = async (...args: any[]) => pipeLog(LogType.INFO, ...args);
const logWarn = async (...args: any[]) => pipeLog(LogType.WARN, ...args);
const logError = async (...args: any[]) => pipeLog(LogType.ERROR, ...args);

const pipeLog = (prefix: LogType, ...args: any[]) => {
  const diffString = `D: ${ms(Math.round(Date.now() - lastLogTime))}`;

  console[getFunc(prefix)](`[${prefix}]:`, ...args);
  fs.appendFileSync(currentLogFile, `[${getTimestamp()} | ${diffString}] [${prefix}]: ${args.map(formatArg).join(' ')}\n`);
  lastLogTime = Date.now();
};

const getFunc = (type: LogType) => {
  switch (type) {
    case LogType.INFO:
      return 'log';
    case LogType.WARN:
      return 'warn';
    case LogType.ERROR:
      return 'error';
    default:
      return 'log';
  }
};

const formatArg = (arg: any) => {
  if (arg instanceof Error) return arg.stack;
  if (typeof arg === 'object') return '\n' + JSON.stringify(arg, null, 2);
  return arg;
};

const getTimestamp = () => `${getDate()} ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}`;

function getDate() {
  return new Date().toLocaleDateString('en-US');
}

export { LogType, logInfo, logWarn, logError, getTimestamp, getDate };
