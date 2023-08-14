import debug from "debug";

let tmp;
function empty() {
  // do nothing;
}
function retEmpty() {
  return empty;
}

if (process.env.NODE_DEV) {
  tmp = debug;
} else {
  tmp = retEmpty;
}

export default tmp;
