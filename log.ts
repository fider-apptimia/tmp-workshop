const logs: string[] = [];
export const log = (indent: number, msg: string) => {
  const print = `${' '.repeat(2 * indent)}${msg}`;

  if (log.immediate) {
    console.log(print);
  } else {
    logs.push(print);
  }
}

log.immediate = false;

process.once('beforeExit', () => {
  console.log(logs.join('\n'));
  setTimeout(() => {}, 1);
})
