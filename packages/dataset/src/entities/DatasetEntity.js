import {Entity} from "./Entity.js";
import DatasetEntitySchema from "./DatasetEntity.schema.js";
//import { NTPlugin as NTPDefault } from "../../plugin/nodeType/NTPDefault";

/*
export const linkType2LinkTypePair = (linkType) => {
  switch (linkType) {
    case "friend":
      return "friend";

    case "child":
      return "parent";

    case "parent":
      return "child";

    default:
      return linkType;
  }
};

export const nodeKey2NodeType = (nodeKey) => nodeKey.split(":")[0];

export const nodeKey2NodeID = (nodeKey) => nodeKey.split(":")[1];

export const nodeTypeNodeID2NodeKey = (nodeType, nodeID) => `${nodeType}:${nodeID}`;
*/
export class DatasetEntity extends Entity {
  constructor(jsonData, schema = DatasetEntitySchema) {
    super(jsonData, schema);

    this.availableNodeTypes = {};
    this.neededNodeTypes = this._data.nodeTypes;
    this.usedNodeTypes = {};
    this.setNodeTypePlugins();
  }

  setNodeTypePlugins(nodeTypePlugins = {}) {
    /*
    if (!this.availableNodeTypes.NTPDefault) {
      this.availableNodeTypes.NTPDefault = (new NTPDefault(this._data));
    }
    Object.entries(nodeTypePlugins).forEach(([NTPKey, NTPClass]) => {
      if (!this.availableNodeTypes[NTPKey]) {
        this.availableNodeTypes[NTPKey] = (new NTPClass(this._data));
      }
    });
    this.nodeTypes = {};
    this.neededNodeTypes.forEach((nodeType) => {
      if (this.availableNodeTypes[nodeType.classname]) {
        this.usedNodeTypes[nodeType.classname] = this.availableNodeTypes[nodeType.classname];
        this.nodeTypes[nodeType.prefix] = this.availableNodeTypes[nodeType.classname];
      } else {
        this.usedNodeTypes.NTPDefault = this.availableNodeTypes.NTPDefault;
        this.nodeTypes[nodeType.prefix] = this.availableNodeTypes.NTPDefault;
      }
    });
    */
  }
  // Node functions
  addNode(nodeType, text) {
    this.isModified = true;
    return this.nodeTypes[nodeType].addNode(nodeType, text);
  }

  getNode(nodeKey) {
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].getNode(nodeKey);
  }

  getNodeRaw(nodeKey) {
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].getNodeRaw(nodeKey);
  }

  setNode(nodeKey, text) {
    this.isModified = true;
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].setNode(nodeKey, text);
  }

  setNodeRaw(nodeKey, node) {
    this.isModified = true;
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].setNodeRaw(nodeKey, node);
  }

  deleteNode(nodeKey) {
    this.isModified = true;
    this.nodeTypes[nodeKey2NodeType(nodeKey)].getNodeLinks(nodeKey)
      .forEach((link) => this.nodeTypes[nodeKey2NodeType(link.to)].deleteNodeLinks(link.to, linkType2LinkTypePair(link.type), nodeKey));
    this.nodeTypes[nodeKey2NodeType(nodeKey)].deleteNode(nodeKey);
  }

  // NodeLink functions
  addNodeLink(fromNodeKey, linkType, toNodeKey) {
    this.isModified = true;
    this.nodeTypes[nodeKey2NodeType(fromNodeKey)].addNodeLink(fromNodeKey, linkType, toNodeKey);
    this.nodeTypes[nodeKey2NodeType(toNodeKey)].addNodeLink(toNodeKey, linkType2LinkTypePair(linkType), fromNodeKey);
  }

  getNodeLinks(nodeKey, linkType, toNodeKey) {
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].getNodeLinks(nodeKey, linkType, toNodeKey);
  }

  deleteNodeLinks(fromNodeKey, linkType, toNodeKey) {
    this.isModified = true;
    if (toNodeKey) {
      this.nodeTypes[nodeKey2NodeType(fromNodeKey)].deleteNodeLinks(fromNodeKey, linkType, toNodeKey);
      this.nodeTypes[nodeKey2NodeType(toNodeKey)].deleteNodeLinks(toNodeKey, linkType2LinkTypePair(linkType), fromNodeKey);
    } else {
      this.getNodeLinks(fromNodeKey, linkType)
        .forEach((link) => this.nodeTypes[nodeKey2NodeType(link.to)].deleteNodeLinks(link.to, linkType2LinkTypePair(link.type), fromNodeKey));
      this.nodeTypes[nodeKey2NodeType(fromNodeKey)].deleteNodeLinks(fromNodeKey, linkType);
    }
  }

  deleteNodeLinkByLinkKey(linkKey) {
    // TODO: Ezt nem tudom miért raktam bele. Átgondolandó.
    this.isModified = true;
    const [fromNodeType, fromNodeID, linkType, toNodeType, toNodeID] = linkKey.split(":");
    this.deleteNodeLinks(nodeTypeNodeID2NodeKey(fromNodeType, fromNodeID), linkType, nodeTypeNodeID2NodeKey(toNodeType, toNodeID));
  }

/*
  // NodeData functions
  getNodeData(pluginKey, nodeKey) {
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].getNodeData(pluginKey, nodeKey);
  }

  setNodeData(pluginKey, nodeKey, nodeData) {
    this.isModified = true;
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].setNodeData(pluginKey, nodeKey, nodeData);
  }

  deleteNodeData(pluginKey, nodeKey) {
    this.isModified = true;
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].deleteNodeData(pluginKey, nodeKey);
  }


  // NodeTag functions
  addNodeTags(nodeKey, tags) {
    this.isModified = true;
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].addNodeTags(nodeKey, tags);
  }

  getNodeTags(nodeKey) {
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].getNodeTags(nodeKey);
  }

  setNodeTags(nodeKey, tags) {
    this.isModified = true;
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].setNodeTags(nodeKey, tags);
  }

  deleteNodeTags(nodeKey, tags) {
    this.isModified = true;
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].deleteNodeTags(nodeKey, tags);
  }


  // NodeLinkTag functions
  addNodeLinkTags(nodeKey, linkType, toNodeKey, tags) {
    this.isModified = true;
    // TODO: Question: Shouldn't it be tagged symetrically?
    this.nodeTypes[nodeKey2NodeType(nodeKey)].addNodeLinkTags(nodeKey, linkType, toNodeKey, tags);
  }

  getNodeLinkTags(nodeKey, linkType, toNodeKey) {
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].getNodeLinkTags(nodeKey, linkType, toNodeKey);
  }

  setNodeLinkTags(nodeKey, linkType, toNodeKey, tags) {
    this.isModified = true;
    // TODO: Question: Shouldn't it be tagged symetrically?
    this.nodeTypes[nodeKey2NodeType(nodeKey)].setNodeLinkTags(nodeKey, linkType, toNodeKey, tags);
  }

  deleteNodeLinkTags(nodeKey, linkType, toNodeKey, tags) {
    this.isModified = true;
    // TODO: Question: Shouldn't it be tagged symetrically?
    this.nodeTypes[nodeKey2NodeType(nodeKey)].deleteNodeLinkTags(nodeKey, linkType, toNodeKey, tags);
  }


  // ------------------------------------------------------------------------------
  getTags() {
    return Object.keys(this._data.tags);
  }

  searchNodesByText(nodeType, searchText, limit = 10) {
    if (nodeType) {
      return this.nodeTypes[nodeType].searchNodesByText(searchText, limit);
    } else {
      // TODO: Is it really what I want here?
      return this.availableNodeTypes.NTPDefault.searchNodesByText(searchText, limit);
    }
  }
*/
}
