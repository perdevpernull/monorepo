import {Interface} from "./Interface.js"


class Test {
  myFunc1(x) {
    return x;
  }

  myFunc2(x) {
    return x;
  }
}
const TestInstance = new Test();
const funcList_Missing =           ['myFunc3'];
const funcList_Missing_WrongCase = ['myFunc1','myfunc2'];
const funcList_OK =                ['myFunc1','myFunc2'];
const myInterface_Missing = new Interface(...funcList_Missing);
const myInterface_Missing_WrongCase = new Interface(...funcList_Missing_WrongCase);
const myInterface_OK = new Interface(...funcList_OK);

describe("Interface.isImplementedBy() :: checking a Class", () => {
  test("it should return false when any of the required functions are missing", () => {
    expect(myInterface_Missing.isImplementedBy(Test)).toEqual(false);
  });
  test("it should return false when any of the required functions are missing (case sensitive test)", () => {
    expect(myInterface_Missing_WrongCase.isImplementedBy(Test)).toEqual(false);
  });
  test("it should return true when all of the required functions are implemented", () => {
    expect(myInterface_OK.isImplementedBy(Test)).toEqual(true);
  });
});

describe("Interface.isImplementedBy() :: checking an instance of a Class", () => {
  test("it should return false when any of the required functions are missing", () => {
    expect(myInterface_Missing.isImplementedBy(TestInstance)).toEqual(false);
  });
  test("it should return false when any of the required functions are missing (case sensitive test)", () => {
    expect(myInterface_Missing_WrongCase.isImplementedBy(TestInstance)).toEqual(false);
  });
  test("it should return true when all of the required functions are implemented", () => {
    expect(myInterface_OK.isImplementedBy(TestInstance)).toEqual(true);
  });
});

describe("Interface.isImplementedBy() :: checking a string", () => {
  test("it should throw an error when the expected objec is not a class neither an instance of a class", () => {
    expect(() => {
      myInterface_Missing.isImplementedBy("string test");
    }).toThrow("has to be a class");
  });
});
