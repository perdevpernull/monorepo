import {Entity} from "./Entity.js";
import DatasetEntitySchema from "./DatasetEntity.schema.js";
import {NTPDefault} from "../plugins/nodeType/NTPDefault/NTPDefault.js";
import {Xifo as Queue} from "utils";

const linkType2LinkTypePair = {
  "child": "parent",
  "parent": "child",
  "friend": "friend",
};
const nodeKey2NodeType = (nodeKey) => {
  return nodeKey.split(":")[0];
};
const nodeKey2NodeID = (nodeKey) => {
  return nodeKey.split(":")[1];
};
// const nodeTypeNodeID2NodeKey = (nodeType, nodeID) => `${nodeType}:${nodeID}`;

export class DatasetEntity extends Entity {
  constructor(jsonData) {
    super(jsonData, DatasetEntitySchema);

    this.availableNodeTypes = {"NTPDefault": new NTPDefault(this._data)};
    this.nodeTypes = {};
    this.setNodeTypePlugins();
  }

  setNodeTypePlugins(nodeTypePlugins = {}) {
    Object.entries(nodeTypePlugins).forEach(([NTPKey, NTPClass]) => {
      if (!this.availableNodeTypes[NTPKey]) {
        this.availableNodeTypes[NTPKey] = new NTPClass(this._data);
      }
    });
    this.nodeTypes = {};
    this._data.nodeTypes.forEach((nodeType) => {
      if (this.availableNodeTypes[nodeType.classname]) {
        this.nodeTypes[nodeType.nodeType] = this.availableNodeTypes[nodeType.classname];
      } else {
        this.nodeTypes[nodeType.nodeType] = this.availableNodeTypes.NTPDefault;
      }
    });
  }

  // Node functions
  addNode(nodeType, text) {
    this.isModified = true;
    const nodeKey = this.nodeTypes[nodeType].addNode(nodeType, text);
    this._data.rootNodes[nodeKey] = nodeKey2NodeID(nodeKey);
    return nodeKey;
  }

  getNode(nodeKey) {
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].getNode(nodeKey);
  }

  /* getNodeRaw(nodeKey) {
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].getNodeRaw(nodeKey);
  } */

  setNode(nodeKey, text) {
    this.isModified = true;
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].setNode(nodeKey, text);
  }

  /* setNodeRaw(nodeKey, node) {
    this.isModified = true;
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].setNodeRaw(nodeKey, node);
  } */

  deleteNode(nodeKey) {
    this.isModified = true;
    this.deleteNodeLinks(nodeKey);
    this.nodeTypes[nodeKey2NodeType(nodeKey)].deleteNode(nodeKey);
    delete this._data.rootNodes[nodeKey];
  }

  // NodeLink functions
  addNodeLink(fromNodeKey, linkType, toNodeKey) {
    this.isModified = true;
    this.nodeTypes[nodeKey2NodeType(fromNodeKey)].addNodeLink(fromNodeKey, linkType, toNodeKey);
    this.nodeTypes[nodeKey2NodeType(toNodeKey)].addNodeLink(toNodeKey, linkType2LinkTypePair[linkType], fromNodeKey);
    if (linkType === "parent") {
      delete this._data.rootNodes[fromNodeKey];
    } else if (linkType === "child") {
      delete this._data.rootNodes[toNodeKey];
    }
  }

  getNodeLinks(nodeKey, linkType, toNodeKey) {
    return this.nodeTypes[nodeKey2NodeType(nodeKey)].getNodeLinks(nodeKey, linkType, toNodeKey);
  }

  deleteNodeLinks(fromNodeKey, linkType, toNodeKey) {
    this.isModified = true;
    this.getNodeLinks(fromNodeKey, linkType, toNodeKey).forEach((link) => {
      this.nodeTypes[nodeKey2NodeType(link.to)].deleteNodeLinks(link.to, linkType2LinkTypePair[linkType], fromNodeKey);
      if (this.getNodeLinks(link.to, "parent").length === 0) {
        this._data.rootNodes[link.to] = nodeKey2NodeID(link.to);
      }
    });
    this.nodeTypes[nodeKey2NodeType(fromNodeKey)].deleteNodeLinks(fromNodeKey, linkType, toNodeKey);
    if (linkType === "parent" && this.getNodeLinks(fromNodeKey, "parent").length === 0) {
      this._data.rootNodes[fromNodeKey] = nodeKey2NodeID(fromNodeKey);
    }
  }

  /*
    deleteNodeLinkByLinkKey(linkKey) {
        // TODO: Ezt nem tudom miért raktam bele. Átgondolandó.
        this.isModified = true;
        const [fromNodeType, fromNodeID, linkType, toNodeType, toNodeID] = linkKey.split(":");
        this.deleteNodeLinks(nodeTypeNodeID2NodeKey(fromNodeType, fromNodeID), linkType, nodeTypeNodeID2NodeKey(toNodeType, toNodeID));
    }

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
  searchOrphanedNodes() {
    const allNodeKeyssArray = Object.keys(this._data.nodes);
    const NodeKeysObject = allNodeKeyssArray.reduce((obj, key) => {
      return Object.assign(obj, {[key]: key});
    }, {});
    const rootConnectedNodeKeysQueue = new Queue();
    Object.keys(this._data.rootNodes).forEach((nodeKey) => {
      if (NodeKeysObject[nodeKey]) {
        rootConnectedNodeKeysQueue.push(nodeKey);
        delete NodeKeysObject[nodeKey];
      }
    });

    while (!rootConnectedNodeKeysQueue.isEmpty) {
      const nodeKey = rootConnectedNodeKeysQueue.pull();
      this.getNodeLinks(nodeKey, "child").forEach((nodeLink) => {
        if (NodeKeysObject[nodeLink.to]) {
          rootConnectedNodeKeysQueue.push(nodeLink.to);
          delete NodeKeysObject[nodeLink.to];
        }
      });
    }

    return NodeKeysObject;
  }
}
