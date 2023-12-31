export default {
  "$id": "https://MyInfo.com/schemas/DatasetEntity.schema.json",
  "type": "object",
  "required": ["nodeTypes", "nextNodeID", "nodes", "tagNodes", "rootNodes", "data"],
  "properties": {
    "nodeTypes": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["nodeType", "classname", "version"],
        "properties": {
          "nodeType": {"type": "string"},
          "classname": {"type": "string"},
          "version": {"type": "string"},
        },
        "additionalProperties": false,
      },
    },
    "nextNodeID": {
      "type": "number",
    },
    "nodes": {
      "type": "object",
      "patternProperties": {
        "^.+:[0-9]+$": {
          "type": "object",
          "required": ["ID", "type", "text", "links"],
          "properties": {
            "ID": {"type": "string"},
            "type": {"type": "string"},
            "text": {"type": "string"},
            "links": {
              "type": "array",
              "items": {
                "type": "object",
                "required": ["to", "type", "tags"],
                "properties": {
                  "to": {"type": "string"},
                  "type": {"type": "string"},
                  "tags": {
                    "type": "array",
                    "items": {
                      "type": "string",
                    },
                  },
                },
                "additionalProperties": false,
              },
            },
          },
          "additionalProperties": false,
        },
      },
      "additionalProperties": false,
    },
    "tagNodes": {
      "type": "object",
    },
    "rootNodes": {
      "type": "object",
      "patternProperties": {
        "^.+:[0-9]+$": {"type": "number"},
      },
      "additionalProperties": false,
    },
    "data": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "patternProperties": {
          "^.+:[0-9]+$": {},
        },
        "additionalProperties": false,
      },
    },
  },
  "additionalProperties": false,
};
