/*!
Copyright (C) 2011 by Andrea Giammarchi, @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
var _ = this._ = function(_, Function, Object) {
  /*! (C) WebReflection *//** @preserve https://github.com/WebReflection/redefine */
  var
    // scoped shortcuts/constants
    BOUND = 'bound',
    CONFIGURABLE = 'configurable',
    CONSTRUCTOR = 'constructor',
    ENUMERABLE = 'enumerable',
    EXTEND = 'extend',
    GET = 'get',
    MIXIN = 'mixin',
    PRIVATE = '__@',
    PROTO = '__proto__',
    PROTOTYPE = 'prototype',
    SET = 'set',
    STATICS = 'statics',
    SUPER = 'super',
    VALUE = 'value',
    WRITABLE = 'writable',

    createFunction = Function,

    bind = Function.bind || function bind(self) {
      var cb = this;
      return function() {
        return cb.apply(self, arguments);
      };
    },

    getTheRightOne = function (property, dflt) {
      return _[property] || Object[property] || dflt;
    },

    // from Object || Object.prototype if _ has no polyfills;
    defineProperty            = getTheRightOne('defineProperty'),
    hasOwnProperty            = getTheRightOne('hasOwnProperty'),
    getOwnPropertyDescriptor  = getTheRightOne('getOwnPropertyDescriptor'),
    getOwnPropertyNames       = getTheRightOne('getOwnPropertyNames', Object.keys),
    getPrototypeOf            = getTheRightOne('getPrototypeOf',
                                function getPrototypeOf(object) {
                                  return object[PROTO];
                                }),

    // ES7 proposal (cannot use lo-dash for this)
    mixin = Object.mixin || function mixin(
      target, source
    ) {
      for(var
        keys = getOwnPropertyNames(source),
        i = keys.length; i--; defineMagic(
          target,
          keys[i],
          nullObject,
          getOwnPropertyDescriptor(
            source,
            keys[i]
          )
        )
      );
      return target;
    },

    // from _ enriched through other libraries or just Object.create
    create = _.create || _.inherit || Object.create,

    // ES5 descriptor properties
    commonProperties = [
      CONFIGURABLE,
      ENUMERABLE,
      GET,
      SET,
      VALUE,
      WRITABLE
    ],

    // delete all ES5 properties
    clear = createFunction('o', 'delete o.' +
      commonProperties.join(';delete o.') 
    ),

    // recycled object for a happier GC
    boundDescriptor = create(null),
    superDescriptor = create(null),
    nullObject = create(null),
    staticsDescriptor = {},
    valueObject = {},

    hasDescriptorBug = false,

    // defined later on
    i, assign, remove,
    O_o
  ;

  staticsDescriptor[WRITABLE] = true;
  staticsDescriptor[ENUMERABLE] = true;

  for(i = 0; i < commonProperties.length; i++) {
    commonProperties[i] = ['if(h.call(a,"', '"))b.', '=a.',';'].join(commonProperties[i]);
  }
  // assign only object own properties
  assign = createFunction('h','return function(a,b){' + commonProperties.join('') + '}')(hasOwnProperty);

  function clone(o, p) {
    for (var
      descriptor = {},
      keys = getOwnPropertyNames(o),
      i = 0,
      length = keys.length,
      key;
      i < length; i++
    ) {
      key = keys[i];
      descriptor[key] = getOwnPropertyDescriptor(o, key);
    }
    return create(
      p === undefined ? getPrototypeOf(o) : p,
      descriptor
    );
  }

  function defineMagic(object, key, defaults, descriptor) {
    assign(defaults || redefine.defaults || {}, nullObject);
    assign(descriptor, nullObject);
    if (
      hasOwnProperty.call(descriptor, GET) ||
      hasOwnProperty.call(descriptor, SET)
    ) {
      delete nullObject[WRITABLE];
      delete nullObject[VALUE];
    }
    defineProperty(object, key, nullObject);
    clear(nullObject);
  }

  // define a single property with a specific value
  function define(object, key, value, defaults) {
    defineMagic(
      object,
      key,
      defaults,
      value instanceof As ?
        value : (
          value instanceof Later ?
            lazy(object, key, value) : (
              valueObject[VALUE] = value, valueObject
            )
        )
    );
    delete valueObject[VALUE];
  }

  function defineAll(object, values, defaults) {
    // this is actually cheaper than an
    // Object.keys(values).forEach(callback)
    // it is also faster so ...
    for (var key in values) {
      if (hasOwnProperty.call(values, key)) {
        define(object, key, values[key], defaults);
      }
    }
    /* one day this should probably be ...
    for(var
      keys = getOwnPropertyNames(values),
      i = keys.length; i--; define(
        object, keys[i], values[keys[i]], defaults
      )
    );
    // */
  }

  function mixins(target, source) {
    for (var i = 0, current, tmp; i < source.length; i++) {
      current = source[i];
      if (isFunction(current)) {
        current = (current.type || current.name) === 'mixin' ?
          current.call(current) || current :
          current[PROTOTYPE];
      }
      mixin(target, current);
    }
  }

  function lazy(object, key, descriptor) {
    // trap these properties at definition time
    // and don't bother ever again!
    var
      callback = descriptor._,
      configurable = hasOwnProperty.call(descriptor, CONFIGURABLE) ?
        !!descriptor[CONFIGURABLE] : true,
      enumerable = hasOwnProperty.call(descriptor, ENUMERABLE) && descriptor[ENUMERABLE],
      writable = hasOwnProperty.call(descriptor, WRITABLE) && descriptor[WRITABLE],
      self
    ;
    descriptor[GET] = function get() {
      if(hasDescriptorBug) {
        descriptor = getOwnPropertyDescriptor(object, key);
        delete object[key];
      }
      nullObject[VALUE] = callback.call(self = this);
      nullObject[CONFIGURABLE] = configurable;
      nullObject[ENUMERABLE] = enumerable;
      nullObject[WRITABLE] = writable;
      defineProperty(self, key, nullObject);
      clear(nullObject);
      if (hasDescriptorBug) {
        assign(descriptor, nullObject);
        defineProperty(object, key, nullObject);
        clear(nullObject);
      }
      return self[key];
    };
    // to know more about this
    // see hasDescriptorBug = true part at the bottom
    if(hasDescriptorBug) {
      // unfortunately inevitable for Android 2.2 and 2.3 devices
      descriptor[CONFIGURABLE] = true;
    }
    return descriptor;
  }

  // internal/private class
  // checked for descriptors
  function As(descriptor) {
    assign(descriptor, this);
  }

  // public As factory
  function as(descriptor) {
    return new As(descriptor);
  }

  // common simplified internal utility
  function createFromGeneric(object) {
    return create(isFunction(object) ?
        object[PROTOTYPE] : object
    );
  }

  // creates an instanceof the first argument
  // then applies properties, if specified
  // using defaults too
  function from(object, properties, defaults) {
    var instance = createFromGeneric(object);
    return properties ?
      redefine(instance, properties, defaults) :
      instance
    ;
  }

  // common simplified internal utility
  function isFunction(object) {
    return typeof object === 'function';
  }

  // internal/private class
  // checked for lazy property assignment
  function Later(callback) {
    this._ = isFunction(callback) ?
      callback :
      assign(callback, this) || callback[VALUE]
    ;
  }

  // public Later factory
  function later(callback) {
    return new Later(callback);
  }

  // the actual exported library out there
  function redefine(
    object,   // an object where property/ies should be re/defined
    key,      // the property name or the object with all of them
    value,    // the property value or defaults, if key i san object
    defaults  // the optional defaults or undefined, if specified in value
  ) {
    // exactly same things:
    // obj <== redefine(obj, key, value[, defaults]);
    // obj <== redefine(obj, objProps[, defaults]);
    return (typeof key == 'string' ?
      define(object, key, value, defaults) :
      defineAll(object, key, value)
    ) || object;
  }

  // create a partial implementation
  // with defaults pre assigned
  function using(defaults) {
    return function redefine(object, key, value) {
      return (typeof key == 'string' ?
        define(object, key, value, defaults) :
        defineAll(object, key, defaults)
      ) || object;
    };
  };

  // magic, freaking cool, only, real
  // Java like, this.super(); YEAH!
  // works only in a non strict environment though
  // but you don't have to use it
  function getSuperMethod(caller, proto) {
    var i, key, keys, parent;
    while ((proto = getPrototypeOf(proto))) {
      keys = getOwnPropertyNames(proto);
      i = keys.length;
      while (i--) {
        if (proto[key = keys[i]] === caller) {
          do {
            parent = getPrototypeOf(proto);
            proto = parent;
          } while (parent[key] === caller);
          return parent[key];
        }
      }
    }
  }
  function Super() {
    return getSuperMethod(Super.caller, this).apply(this, arguments);
  }
  superDescriptor[VALUE] = function superBound(context) {
    return bind.apply(
      getSuperMethod(superBound.caller, context),
      arguments
    );
  };
  superDescriptor[CONFIGURABLE] =
  superDescriptor[ENUMERABLE] =
  superDescriptor[WRITABLE] = false;
  defineProperty(Super, 'bind', superDescriptor);
  superDescriptor[VALUE] = Super;

  function bound(object, methodName) {
    return typeof object === 'string' ?
      bound(this, object) :
      object[PRIVATE + methodName] || defineBoundMethod(object, methodName);
  }

  function defineBoundMethod(self, methodName) {
    boundDescriptor[VALUE] = bind.call(self[methodName], self);
    defineProperty(self, PRIVATE + methodName, boundDescriptor);
    boundDescriptor[VALUE] = bound;
    return self[PRIVATE + methodName];
  }

  boundDescriptor[ENUMERABLE] = false;
  boundDescriptor[CONFIGURABLE] =
  boundDescriptor[WRITABLE] = true;
  boundDescriptor[VALUE] = bound;

  // Classes with semantics and power you need!
  // var Lib = redefine.Class({
  //
  //   extend: SuperLib,  // inheritance
  //
  //   mixin: oneOrMoreObject,  // mixin
  //          Constructor
  //
  //   statics: {         // statics
  //     someMethod: function () {},
  //     someProperty: 0
  //   },
  //                      // common definition
  //   method1: function () {},
  //   property1: null
  //
  //                      // constructor
  //   constructor: function Lib() {
  //     // implicit initialization
  //     // never invoked if extended via other classes
  //   }
  // });
  function Class(definition, defaults) {
    var
      constructor = hasOwnProperty.call(definition, CONSTRUCTOR) ?
        definition[CONSTRUCTOR] :
        function Constructor() {},
      statics = hasOwnProperty.call(definition, STATICS) && definition[STATICS],
      extend = hasOwnProperty.call(definition, EXTEND) && definition[EXTEND],
      key
    ;
    if (!defaults) {
      defaults = {};
      //defaults[CONFIGURABLE] = true;
      defaults[WRITABLE] = true;
    }
    delete definition[CONSTRUCTOR];
    if (extend) {
      delete definition[EXTEND];
      redefine(
        constructor[PROTOTYPE] = createFromGeneric(extend),
        'constructor',
        constructor
      );
      if (isFunction(extend)) {
        for(key in extend) {
          if (hasOwnProperty.call(extend, key) &&
              key !== 'name' && key !== 'length'
          ) {
            defineMagic(
              constructor,
              key,
              nullObject,
              getOwnPropertyDescriptor(extend, key)
            );
          }
        }
      }
    }
    if (statics) {
      delete definition[STATICS];
      defineAll(constructor, statics, staticsDescriptor);
    }
    if (hasOwnProperty.call(definition, MIXIN)) {
      mixins(constructor[PROTOTYPE], [].concat(definition[MIXIN]));
      delete definition[MIXIN];
    }
    defineAll(constructor[PROTOTYPE], definition, defaults);
    withSuper(constructor[PROTOTYPE]);
    if (!(BOUND in constructor[PROTOTYPE])) {
      defineProperty(
        constructor[PROTOTYPE],
        BOUND,
        boundDescriptor
      );
    }
    return constructor;
  }

  function withSuper(proto) {
    return hasOwnProperty.call(proto, SUPER) ?
      object : defineProperty(proto, SUPER, superDescriptor);
  }

  // utilities
  redefine.from = from;       // similar to Object.create
                              // with redefine like second argument
  redefine.Class = Class;     // class utility to organize code
  redefine[SUPER]= withSuper; // magic .super() behavior
  redefine.mixin = mixin;     // Object.mixin() ES6 like proposal
  redefine.bound = bound;     // ensure a bound method once
  redefine.clone = clone;     // a proper ES5 way to clone objects
                              // (deep/recursive clone not supported)

  // sub-utilities
  redefine.as = as;           // specify exatc descriptor
  redefine.later = later;     // lazy variable assignment
  redefine.using = using;     // specify defaults
  redefine.defaults = {};     // set explicit generic defaults

  // var redefine = require('redefine');
  if ('undefined' !== typeof module && module.exports) {
    (module.exports = redefine).redefine = redefine;
  }

  // there you are ...
  if (_.mixin) {
    // Lo-Dash or Underscore
    // _(object).redefine(property, value)
    // _(object).redefine(properties)
    // _.redefine(object, properties)
    _.mixin({redefine: redefine});
  } else {
    _.redefine = redefine;
  }

  try {
    // Android 2.2 and 2.3 and webOS
    // plus Dolphin in older Androids
    // have a really weird bug where inherited
    // getters cannot be set as value
    // in that case is a bit more complicated
    // to obtain a later() behavior
    // but at least it's consistent ^_^
    // Opera Mobile or all other browsers
    // won't be affected
    O_o = create(redefine({},{_:later(Object)}))._;
  } catch(o_O) {
    clear(nullObject);
    hasDescriptorBug = true;
  }

  return _;

}(_ || this, Function, Object);
