export class Xifo {
  #isFifo;
  #head;
  #tail;
  #elements;
  constructor(options = {"mode": "fifo"}) {
    ({"mode": this.mode} = options);
    this.#elements = {};
    this.#head = 0;
    this.#tail = 0;
  }
  push(element) {
    this.#elements[this.#tail] = element;
    this.#tail++;
  }
  pull() {
    let item;
    if (this.length > 0) {
      item = this.peek();
      if (this.#isFifo) {
        delete this.#elements[this.#head];
        this.#head++;
      } else {
        delete this.#elements[this.#tail - 1];
        this.#tail--;
      }
    }
    return item;
  }
  peek() {
    if (this.#isFifo) {
      return this.#elements[this.#head];
    } else {
      return this.#elements[this.#tail - 1];
    }
  }
  get length() {
    if (this.#isFifo) {
      return this.#tail - this.#head;
    } else {
      return this.#tail;
    }
  }
  get isEmpty() {
    return this.length === 0;
  }
  set mode(mode) {
    if (this.#isFifo === undefined) {
      if (mode === "fifo") {
        this.#isFifo = true;
      } else {
        this.#isFifo = false;
      }
    } else {
      throw new Error("Already initialized");
    }
  }
}
