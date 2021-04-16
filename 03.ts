import {log} from './log'

async function softAsync(result: 'ok' | 'err'): Promise<void> {
  return new Promise((resolve, reject) => {
    log(2, 'softAsync executor()')
    if (result === 'ok') {
      resolve();
    } else {
      reject({ code: 99 });
    }
  });
}

async function hardAsync(result: 'ok' | 'err', afterMs: number): Promise<void> {
  return new Promise((resolve, reject) => {
    log(2, 'hardAsync executor()')
    setTimeout(() => {
      log(3, 'hardAsync executor setTimeout()');
      if (result === 'ok') {
        resolve();
      } else {
        reject({ code: 99 });
      }
    }, afterMs);
  });
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callAsync(type: 'soft' | 'hard', wait: 'await' | 'noWait', result: 'ok' | 'err') {
  const asyncFunc = type === 'soft' ? softAsync : hardAsync;
  const doAwait = wait === 'await' ? 'await ' : '';
  const funcName = type + 'Async';


  log(1, `callAsync()  before ${doAwait}${funcName}()`);

  if (wait === 'await') {
    await asyncFunc(result, 10);
  } else {
    asyncFunc(result, 10);
  }

  log(1, `callAsync()  after ${doAwait}${funcName}()`);
}

run().catch(err => log(0, 'ERROR CAUGHT :)'));

async function run() {
  log(0, 'before async...()')


  // try callAsync with & without await
  await callAsync('soft', 'await', 'err');


  // VS:
  // callAsync('soft', 'noWait', 'ok');
  // callAsync('soft', 'await', 'ok');

  // VS:
  // await callAsync('soft', 'await', 'err');
  // await callAsync('soft', 'noWait', 'err');

  // VS:
  // callAsync('soft', 'await', 'err');
  // callAsync('soft', 'noWait', 'err');

  log(0, 'after async...()')
}































