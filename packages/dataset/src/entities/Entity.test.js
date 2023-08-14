import {Entity} from "./Entity.js";

let e;

describe("class Entity", () => {
  describe("object creation", () => {
    test("new should fail when 'No jsonData'", () => {
      expect(() => {
        e = new Entity();
      }).toThrow("No jsonData");
    });
    test("new should fail when 'Invalid schema'", () => {
      expect(() => {
        e = new Entity(5);
      }).toThrow("Invalid schema");
    });
    test("new should success when 'Valid schema'", () => {
      expect((e = new Entity("Hello World!")));
    });
  });

  describe("basic functions", () => {
    test("data getter should get internal #data", () => {
      expect(e._data).toBe("Hello World!");
    });
    test("data setter should fail when 'Already initialized'", () => {
      expect(() => {
        e._data = "Hello World!";
      }).toThrow("Already initialized");
    });
  });
});
