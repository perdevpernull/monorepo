import {Entity} from "./Entity.js";


const e = new Entity("Hello World!");

test('Entity creation', () => {
  expect(e.getJsonData()).toBe("Hello World!");
});
