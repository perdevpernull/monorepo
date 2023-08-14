export class NTPDefault {
  constructor(data) {
    this._data = data;
  }

  // Node functions
  addNode(nodeType, text) {
    const ID = `${this._data.nextNodeID}`;
    const type = nodeType;
    const nodeKey = `${type}:${ID}`;
    this._data.nextNodeID += 1;
    this._data.nodes[nodeKey] = {ID, type, text, "links": []};
    return nodeKey;
  }

  getNode(nodeKey) {
    const {ID, type, text} = this._data.nodes[nodeKey];
    return {ID, type, text};
  }

  /*
    getNodeRaw(nodeKey) {
        // TODO: Újragondolni a következményeit h magát az object-et visszaadom (pointer probléma).
        return this._data.nodes[nodeKey];
    }
*/

  setNode(nodeKey, text) {
    this._data.nodes[nodeKey].text = text;
    return this.getNode(nodeKey);
  }

  /*
    setNodeRaw(nodeKey, node) {
        // TODO: Újragondolni a következményeit h magát az object-et állítom (Egy előző getNodaRaw-val keresztbe lehet pointerezni!!!).
        this._data.nodes[nodeKey] = node;
    }
*/

  deleteNode(nodeKey) {
    // TODO: Hiányzik: rootNodes kezelése, visszalinkek kezelése
    delete this._data.nodes[nodeKey];
    this.deleteNodeData(undefined, nodeKey);
  }

  // NodeLink functions
  addNodeLink(fromNodeKey, linkType, toNodeKey) {
    if (this.getNodeLinks(fromNodeKey, linkType, toNodeKey).length === 0) {
      this._data.nodes[fromNodeKey].links.push({"to": toNodeKey, "type": linkType, "tags": []});
    }
    return `${fromNodeKey}:${linkType}:${toNodeKey}`;
  }

  getNodeLinks(fromNodeKey, linkType, toNodeKey) {
    return this._data.nodes[fromNodeKey].links
      .filter((link) => (link.to === toNodeKey || !toNodeKey) && (link.type === linkType || !linkType))
      .map((link) => ({"to": link.to, "type": link.type, "tags": [...link.tags]}));
  }

  deleteNodeLinks(fromNodeKey, linkType, toNodeKey) {
    this._data.nodes[fromNodeKey].links = this._data.nodes[fromNodeKey].links.filter(
      (link) => !((link.to === toNodeKey || !toNodeKey) && (link.type === linkType || !linkType)),
    );
  }

  /*
    // NodeData functions
    getNodeData(pluginKey, nodeKey) {
        if (pluginKey) {
            return this._data.data[pluginKey][nodeKey];
        } else {
            const pluginKeys = Object.keys(this._data.data);
            const data = {};
            pluginKeys.forEach((_pluginKey) => {
                if (this._data.data[_pluginKey][nodeKey] !== undefined) {
                    data[_pluginKey] = this._data.data[_pluginKey][nodeKey];
                }
            });
            return data;
        }
    }

    setNodeData(pluginKey, nodeKey, nodeData) {
        if (pluginKey) {
            this._data.data[pluginKey][nodeKey] = nodeData;
        } else {
            // Insert & modify data
            const pluginKeys = Object.keys(nodeData);
            pluginKeys.forEach((_pluginKey) => {
                if (!this._data.data[_pluginKey]) {
                    this._data.data[_pluginKey] = {};
                }
                this._data.data[_pluginKey][nodeKey] = nodeData[_pluginKey];
            });

            // Delete unneeded
            const allPluginKeys = Object.keys(this._data.data);
            allPluginKeys.forEach((_pluginKey) => {
                if (pluginKeys.indexOf(_pluginKey) === -1) {
                    delete this._data.data[_pluginKey][nodeKey];
                }
            });
        }
    }
*/
  deleteNodeData(pluginKey, nodeKey) {
    if (pluginKey) {
      delete this._data.data[pluginKey][nodeKey];
    } else {
      Object.keys(this._data.data).forEach((_pluginKey) => delete this._data.data[_pluginKey][nodeKey]);
    }
  }

  /*
    // NodeTag functions
    addNodeTags(nodeKey, tags) {
        this._data.nodes[nodeKey].tags = [...new Set([...this._data.nodes[nodeKey].tags, ...tags])];
        return this.getNodeTags(nodeKey);
    }

    getNodeTags = (nodeKey) => ([...this._data.nodes[nodeKey].tags]);

    setNodeTags(nodeKey, tags) {
        this._data.nodes[nodeKey].tags = [...tags];
    }

    deleteNodeTags(nodeKey, tags) {
        if (tags) {
            this._data.nodes[nodeKey].tags = this._data.nodes[nodeKey].tags.filter((tag) => !tags.includes(tag));
        } else {
            this._data.nodes[nodeKey].tags = [];
        }
    }

    // NodeLinkTag functions

    // ------------------------------------------------------------------------------


    searchNodesByText(searchText, limit = 10) {
        let counter = 0;
        const searchResult = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const nodeKey in this._data.nodes) {
            if (this._data.nodes[nodeKey].text.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                counter += 1;
                searchResult.push(this._data.nodes[nodeKey]);
                if (counter >= limit) return searchResult;
            }
        }
        return searchResult;
    }
    */
}
