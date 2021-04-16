import { tickNum } from 'event-loop-ticks';
import {log} from './log'
log.immediate = true;


async function a() {
  log(1, 'a ' + tickNum());
  log(1, `tick before aa() ${tickNum()}`)
  await aa(); // TODO await here
  log(1, `tick after  aa() ${tickNum()}`)
  ab();
}
async function aa() {
  log(2, 'aa ' + tickNum());
  log(1, `tick in     aa() ${tickNum()}`)
  aaa();
}
async function aaa() {
  log(3, 'aaa ' + tickNum());
  log(1, `tick in     aaa() ${tickNum()}`)
}
async function ab() {
  log(2, 'ab ' + tickNum());
}

run();

async function run() {
  log(0, 'before a() ' + tickNum())
  a();
  log(0, 'after a() ' + tickNum())
}