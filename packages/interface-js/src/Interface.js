function createInterface() {
  // retrieved forced function names
  const functionNames = Array.prototype.slice.call(arguments);

  function Interface() {
    const constructor = this.constructor;

    if (constructor === Interface) {
      // Interface is being created on it's own
      throw new Error("Cannot create an instance of Interface");
    } else {
      const prototype = Object.getPrototypeOf(this);
      const unimplemented = [];

      for (let i = 0; i < functionNames.length; i++) {
        if (typeof prototype[functionNames[i]] !== "function") {
          unimplemented.push(functionNames[i]);
        }
      }

      // throw error if there are unimplemented functions
      if (unimplemented.length) {
        throw new Error(`The following function(s) need to be implemented for class ${constructor.name}: ${unimplemented.join(", ")}`);
      }
    }
  }

  /**
   * This function tests if the provided Class or instace of a Class implements
   * all required functions or not.
   * @param {class|object} object - Class or instace of a Class
   * @returns {boolean} **true** if it implements all required functions and **false** if any function implementations are missing
   * @example
   *  const myInterface = new Interface('MyFunc');
   *  class X {
   *    MyFunc() {}
   *  }
   *  myInterface.isImplementedBy(X) // true
   */
  Interface.isImplementedBy = function (object) {
    let prototype;
    switch (typeof object) {
      case "function": // class
        prototype = object.prototype;
        break;
      case "object": // instance of a class
        prototype = Object.getPrototypeOf(object);
        break;
      default:
        throw new Error("The argument has to be a class or an instance of a class.");
    }

    let valid = true;

    for (let i = 0; i < functionNames.length; i++) {
      if (typeof prototype[functionNames[i]] !== "function") {
        valid = false;
        break;
      }
    }

    return valid;
  };

  return Interface;
}

createInterface.create = createInterface;

export {createInterface as Interface};
