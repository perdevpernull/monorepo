import {DatasetEntity} from "./DatasetEntity.js";
import DatasetEntityEmpty from "./DatasetEntity.empty.js";

describe("class DatasetEntity", () => {
  let d;
  let rootID, childID, parentID;

  describe("object creation", () => {
    test("new should fail when 'No jsonData'", () => {
      expect(() => {
        d = new DatasetEntity();
      }).toThrow("No jsonData");
    });
    test("new should fail when 'Invalid schema'", () => {
      expect(() => {
        d = new DatasetEntity("Hello World!");
      }).toThrow("Invalid schema");
    });
    test("new should success when 'Valid schema'", () => {
      expect((d = new DatasetEntity(DatasetEntityEmpty)));
    });
  });

  describe("basic functions", () => {
    test("data getter should get internal #data", () => {
      expect(d._data).toBe(DatasetEntityEmpty);
    });
    test("data setter should fail when 'Already initialized'", () => {
      expect(() => {
        d._data = DatasetEntityEmpty;
      }).toThrow("Already initialized");
    });
  });

  describe("functional tests (add-remove nodes and links)", () => {
    test("UC-01 Adding a root node", () => {
      rootID = d.addNode("ID", "Root Node");
      expect(d.getNode(rootID)).toStrictEqual({"ID": "0", "type": "ID", "text": "Root Node"});
      expect(d._data.rootNodes).toStrictEqual({"ID:0": "0"});
      expect(d.isModified).toBe(true);
      d.isModified = false;
    });
    test("UC-02 Changing a node", () => {
      d.setNode(rootID, "Just Root");
      expect(d.getNode(rootID)).toStrictEqual({"ID": "0", "type": "ID", "text": "Just Root"});
      expect(d.isModified).toBe(true);
      d.isModified = false;
    });
    test("UC-03 Adding a child node to the root node", () => {
      childID = d.addNode("ID", "Child Node");
      d.addNodeLink(rootID, "child", childID);
      expect(d.getNodeLinks(rootID, "child", childID).length).toBe(1);
      expect(d.getNodeLinks(childID, "parent", rootID).length).toBe(1);
      expect(d.isModified).toBe(true);
      d.isModified = false;
    });
    test("UC-04 Adding a parent node to the child node", () => {
      parentID = d.addNode("ID", "Parent Node");
      d.addNodeLink(childID, "parent", parentID);
      expect(d.getNodeLinks(childID, "parent", parentID).length).toBe(1);
      expect(d.getNodeLinks(parentID, "child", childID).length).toBe(1);
      expect(d._data.rootNodes).toStrictEqual({"ID:0": "0", "ID:2": "2"});
      expect(d.isModified).toBe(true);
      d.isModified = false;
    });
    test("UC-05 Eliminating all rootNodes with a circle", () => {
      d.addNodeLink(rootID, "parent", childID);
      d.addNodeLink(parentID, "parent", childID);
      expect(d.getNodeLinks(rootID, undefined, childID).length).toBe(2);
      expect(d.getNodeLinks(childID, undefined, rootID).length).toBe(2);
      expect(d.getNodeLinks(parentID, undefined, childID).length).toBe(2);
      expect(d.getNodeLinks(childID, undefined, parentID).length).toBe(2);
      expect(d._data.rootNodes).toStrictEqual({});
      expect(d.isModified).toBe(true);
      d.isModified = false;
    });
    test("UC-06 Adding a frend link", () => {
      d.addNodeLink(rootID, "friend", parentID);
      expect(d.getNodeLinks(rootID, "friend", parentID).length).toBe(1);
      expect(d.getNodeLinks(parentID, "friend", rootID).length).toBe(1);
      expect(d.isModified).toBe(true);
      d.isModified = false;
    });
    test("UC-07 Deleting a child link", () => {
      d.deleteNodeLinks(parentID, "parent", childID);
      expect(d.getNodeLinks(parentID, undefined, childID).length).toBe(1);
      expect(d.getNodeLinks(childID, undefined, parentID).length).toBe(1);
      expect(d._data.rootNodes).toStrictEqual({"ID:2": "2"});
    });
    test("UC-08 Deleting a node", () => {
      d.deleteNode(parentID);
      expect(d._data.rootNodes).toStrictEqual({});
    });
    test("UC-09 New rootNode entry if no more parents (deleteNodeLinks)", () => {
      d.deleteNodeLinks(rootID, "parent");
      expect(d._data.rootNodes).toStrictEqual({"ID:0": "0"});
    });
    test("UC-10 New rootNode entry if no more parents (deleteNode)", () => {
      d.deleteNode(rootID);
      expect(d._data.rootNodes).toStrictEqual({"ID:1": "1"});
    });
  });

  describe("functional tests (other)", () => {
    test("UC-01 Creating an orphaned pair", () => {
      parentID = d.addNode("ID", "Parent Node");
      d.addNodeLink(childID, "parent", parentID);
      d.addNodeLink(parentID, "parent", parentID);
      expect(d.searchOrphanedNodes()).toStrictEqual({"ID:1": "ID:1", "ID:3": "ID:3"});
    });
    test("UC-02 Getting the rootNode with breaking the cycle in the links", () => {
      d.deleteNodeLinks(parentID, "parent", parentID);
      expect(d.searchOrphanedNodes()).toStrictEqual({});
    });
  });
});
