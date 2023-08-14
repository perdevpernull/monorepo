import Ajv from "ajv";
import EntitySchema from "./Entity.schema.js";

export class Entity {
  #data;

  constructor(jsonData, schema = EntitySchema) {
    this.ajv = new Ajv({"allErrors": true});
    this.ajv.addSchema(schema, this.constructor.name);

    this._data = jsonData;
    this.isModified = false;
  }

  get _data() {
    return this.#data;
  }

  set _data(jsonData) {
    if (!this.#data) {
      if (jsonData) {
        if (this.validateSchema(jsonData)) {
          this.#data = jsonData;
        } else {
          throw new Error(`${this.constructor.name}: Invalid schema: ${this.ajv.errorsText()}\n${JSON.stringify(this.ajv.errors, null, 2)}`);
        }
      } else {
        throw new Error(`${this.constructor.name}: No jsonData`);
      }
    } else {
      throw new Error(`${this.constructor.name}: Already initialized`);
    }
  }

  validateSchema(jsonData, schemaName = this.constructor.name) {
    return this.ajv.validate(schemaName, jsonData);
  }
}
