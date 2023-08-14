import {Xifo} from "./Xifo.js";

describe("class Queue aka default Xifo({mode: 'fifo'})", () => {
  let q;

  describe("object creation", () => {
    test("new should success unconditionally", () => {
      expect((q = new Xifo()));
    });
    test("should fail when setting the mode when 'Already initialized'", () => {
      expect(() => {
        q.mode = "fifo";
      }).toThrow("Already initialized");
    });
  });

  describe("functional tests", () => {
    test("UC-01 pull() from empty Queue", () => {
      expect(q.pull()).toBe(undefined);
    });
    test("UC-02 length and 2* push() and length", () => {
      expect(q.length).toBe(0);
      q.push(15);
      q.push(73);
      expect(q.length).toBe(2);
    });
    test("UC-03 pull() and length", () => {
      expect(q.pull()).toBe(15);
      expect(q.length).toBe(1);
    });
    test("UC-04 isEmpty", () => {
      expect(q.isEmpty).toBe(false);
      expect(q.pull()).toBe(73);
      expect(q.isEmpty).toBe(true);
    });
  });
});

describe("class Stack aka Xifo({mode: 'lifo'})", () => {
  let s;

  describe("object creation", () => {
    test("new should success unconditionally", () => {
      expect((s = new Xifo({"mode": "lifo"})));
    });
    test("should fail when setting the mode when 'Already initialized'", () => {
      expect(() => {
        s.mode = "fifo";
      }).toThrow("Already initialized");
    });
  });

  describe("functional tests", () => {
    test("UC-01 pull() from empty Stack", () => {
      expect(s.pull()).toBe(undefined);
    });
    test("UC-02 length and 2* push() and length", () => {
      expect(s.length).toBe(0);
      s.push(15);
      s.push(73);
      expect(s.length).toBe(2);
    });
    test("UC-03 pull() and length", () => {
      expect(s.pull()).toBe(73);
      expect(s.length).toBe(1);
    });
    test("UC-04 isEmpty", () => {
      expect(s.isEmpty).toBe(false);
      expect(s.pull()).toBe(15);
      expect(s.isEmpty).toBe(true);
    });
  });
});
