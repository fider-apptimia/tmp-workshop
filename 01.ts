import { tickNum } from 'event-loop-ticks';
import {log} from './log'
log.immediate = true;


async function blockingSleep(ms: number) {
  const until = Date.now() + ms;
  while(Date.now() < until) {
    // computations
  }
}


// setTimeout(() => log(0, 'a'), 100);
// setTimeout(() => log(0, 'b'), 100);

// blockingSleep(200);

// log(0, 'c')

function giveMePromise(): Promise<void> {
  return new Promise(resolve => {
    // ...code
    log(0, 'executor');
    // setTimeout(resolve, 0);
    resolve();
  })
}


run();
async function run() {
  setTimeout(() => log(0, 'a'), 0);
  setTimeout(() => log(0, 'b'), 0);

  // blockingSleep(200);
  await giveMePromise();

  log(0, 'c')
}