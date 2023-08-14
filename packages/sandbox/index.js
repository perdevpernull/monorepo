import {Entity, DatasetEntity} from "dataset";
import {Interface} from "interface-js";

console.log("test -- START");

class Xtemp {
  #a = {};
  constructor() {
    this.protect = true;
    this.#a = {"tags": ["a", "b", "c"]};
    this.b = 20;
  }
  get a() {
    return {
      "_a": this.#a,
      get "tags"() {
        return this._a.tags;
      },
      set "tags"(a) {
        //throw new Error("a cannot be set");
        console.log("a cannot be set");
      },
    };
  }
  set a(a) {
    if (this.protect) {
      //throw new Error("a cannot be set");
      console.log("a cannot be set");
    } else {
      this.#a = a;
    }
  }
  get aa() {
    return this.#a;
  }
}

class XXtemp extends Xtemp {
  constructor() {
    super();
    this.aaa = 10;
  }
}

let temp = new XXtemp();
let temp2 = temp.a;
let temp3 = temp.aa;
console.log(temp3);
//temp.aa = 10;

console.log(temp2.tags);
temp.a.tags = ["a"];
temp.a = {};
console.log(temp.a);

temp.protect = false;
temp.protect = true;
temp.a = 16;

const e = new Entity("Hello World!");
console.log(JSON.stringify(e.getJsonData()));
const d = new DatasetEntity({
  "nodeTypes": [1, 2],
  "nextNodeID": 1,
  "nodes": {},
  "tags": {},
  "rootNodes": {},
  "data": {},
});
const x = DatasetEntity.prototype;
const y = Object.getOwnPropertyNames(x);
console.log(JSON.stringify(y));
console.log(JSON.stringify(d.getJsonData()));

const funcList = ["getJsonData", "getJsonData", "setNodeTypePlugins"];
const myInterface = new Interface(...funcList);
console.log(myInterface.isImplementedBy(Entity));
console.log(myInterface.isImplementedBy(e));
console.log(myInterface.isImplementedBy(DatasetEntity));
console.log(myInterface.isImplementedBy(d));
console.log("test -- END");

function calcRectArea(width, height) {
  return width * height;
}

//window.alert("Hellóka");

export {Entity, DatasetEntity, calcRectArea};
