import fs from 'fs';


enum LogType {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR/FATAL',
}

let currentLogFile = `./logs/${getDate().replace(/\//g, '-')}.log`;
let lastLogTime = Date.now();


if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');

// Every 5 min check to make a new log
setInterval(() => {
  currentLogFile = `./logs/${getDate().replace(/\//g, '-')}.log`;
}, 5 * 60 * 1000);

const logInfo = async (msg: string, ...args: any[]) => pipeLog(LogType.INFO, msg, ...args);
const logWarn = async (msg: string, ...args: any[]) => pipeLog(LogType.WARN, msg, ...args);
const logError = async (msg: string, ...args: any[]) => pipeLog(LogType.ERROR, msg, ...args);


const pipeLog = (prefix: LogType, msg: string, ...args: any[]) => {
  const diff = Math.round((Date.now() - (lastLogTime)) / 1000);
  const diffString = `D: ${diff > 60 ? Math.round(diff / 60)+'m' : diff+'s'}`;

  console[getFunc(prefix)](`[${prefix}]: ${msg}`, ...args);
  fs.appendFileSync(currentLogFile, `[${getTimestamp()} | ${diffString}] [${prefix}]: ${msg} ${args.map(formatArg).join(' ')}\n`);
  lastLogTime = Date.now();
}

const getFunc = (type: LogType) => {
  switch (type) {
    case LogType.INFO: return 'log';
    case LogType.WARN: return 'warn';
    case LogType.ERROR: return 'error';
    default: return 'log';
  }
}

const formatArg = (arg: any) => {
  if (arg instanceof Error) return arg.stack;
  if (typeof arg === 'object') return '\n' + JSON.stringify(arg, null, 2);
  return arg;
}

const getTimestamp = () => {
  const date = new Date();
  const time = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0');

  return `${getDate()} at ${time}`;
}

function getDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}


export {
  LogType,
  logInfo,
  logWarn,
  logError,
  getTimestamp,
  getDate,
};
