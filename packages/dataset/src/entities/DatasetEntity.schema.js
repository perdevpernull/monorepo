export default {
  $id: "https://MyInfo.com/schemas/DatasetEntity.schema.json",
  type: "object",
  required: ["nodeTypes", "nextNodeID", "nodes", "tags", "rootNodes", "data"],
  properties: {
    nodeTypes: {
      type: "array",
    },
    nextNodeID: {
      type: "number",
    },
    nodes: {
      type: "object",
      patternProperties: {
        "^.+:[0-9]+$": {
          type: "object",
          required: ["ID", "type", "text", "links", "tags"],
          properties: {
            ID: { type: "number" },
            type: { type: "string" },
            text: { type: "string" },
            links: {
              type: "array",
              items: {
                type: "object",
                required: ["to", "type", "tags"],
                properties: {
                  to: { type: "string" },
                  type: { type: "string" },
                  tags: { 
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                additionalProperties: false,
                },
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
    tags: {
      type: "object",
    },
    rootNodes: {
      type: "object",
      patternProperties: {
        "^.+:[0-9]+$": { type: "number" },
      },
      additionalProperties: false,
    },
    data: {
      type: "object",
      additionalProperties: {
        type: "object",
        patternProperties: {
          "^.+:[0-9]+$": {},
        },
        additionalProperties: false,
      },
    },
  },
  additionalProperties: false,
};
