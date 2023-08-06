import Ajv from "ajv";
import EntitySchema from "./Entity.schema.js";


export class Entity {
  constructor(jsonData, schema = EntitySchema) {
    this._data = {};
    this.ajv = new Ajv({ allErrors: true });
    this.ajv.addSchema(schema, this.constructor.name);

    this.setJsonData(jsonData);
    this.isModified = false;
  }

  getJsonData() {
    return this._data;
  }

  setJsonData(jsonData) {
    if (jsonData) {
      if (this.validateSchema(jsonData)) {
        this._data = jsonData;
      } else {
        // throw new Error(`${this.constructor.name}: Invalid schema ${JSON.stringify(this.ajv.errorsText(), null, 2)}`);
        const TestValue = this.ajv.errorsText();
        throw new Error(`${this.constructor.name}: Invalid schema: ${JSON.stringify(this.ajv.errors, null, 2)}`);
      }
    } else {
      throw new Error(`${this.constructor.name}: No jsonData`);
    }
  }

  validateSchema(jsonData, schemaName = this.constructor.name) {
    return this.ajv.validate(schemaName, jsonData);
  }
}
