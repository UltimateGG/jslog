import { logInfo, logWarn } from '.';

logInfo('test');

setTimeout(() => {
  logWarn('abcd', { a: true});
}, 2000);

