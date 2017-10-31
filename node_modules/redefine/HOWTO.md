redefine VS ES5
===============

#### Create A Null Object

    // redefine
    var o = redefine.from(null);
    
    // ES5
    var o = Object.create(null);

#### Add Properties During Creation

    // redefine
    var o = redefine.from(null, {
      name: "object",
      toString: function () {
        return "Hi, I am " + this.name;
      }
    });
    
    // ES5
    var o = Object.create(null, {
      name: {
        value: "object"
      },
      toString: {
        value: function () {
          return "Hi, I am " + this.name;
        }
      }
    });

#### Add Configurable + Writable Properties During Creation

    // redefine
    var o = redefine.from(null, {
      name: "object",
      toString: function () {
        return "Hi, I am " + this.name;
      }
    }, {
      configurable : true,
      writable: true
    });
    
    // ES5
    var o = Object.create(null, {
      name: {
        configurable: true,
        writable: true,
        value: "object"
      },
      toString: {
        configurable: true,
        writable: true,
        value: function () {
          return "Hi, I am " + this.name;
        }
      }
    });

#### Add A Getter/Setter

    // redefine
    var o = redefine.from({}, {
      bday: Date.now(),
      age: redefine.as({
        set: function () {
          throw 'you cannot set your age';
        },
        get: function () {
          return parseInt(
            (Date.now() - this.bday) /
            (1000 * 60 * 60 * 24 * 365)
          ); // I know, no leap year
        }
      })
    });
    
    // ES5
    var o = Object.create({}, {
      bday: {
        value: Date.now()
      },
      age: {
        set: function () {
          throw 'you cannot set your age';
        },
        get: function () {
          return parseInt(
            (Date.now() - this.bday) /
            (1000 * 60 * 60 * 24 * 365)
          ); // I know, no leap year
        }
      }
    });

#### Real World Example: An Emitter Class
This a simplified `Emitter` class with a logic optimized to save some memory and GC cycle.

    // generic basic Emitter constructor
    function Emitter(){}
    function emit(callback) {
      // just a recycled function
      callback(this);
    }

This is how we can define the prototype of the `Emitter` class.

    // redefine
    redefine(
      Emitter.prototype,
      {
        emit: function (type, data) {
          if (type in this._handlers) {
            this._handlers[type].forEach(emit, data);
          }
          return this;
        },
        on: function (type, handler) {
          var list = this._getList(type);
          list.indexOf(handler) < 0 && list.push(handler);
          return this;
        },
        off: function (type, handler) {
          var list = this._getList(type),
              i = list.indexOf(handler);
          if (-1 < i) {
            list.splice(i, 1);
            if (!list.length) {
              delete this._handlers[type];
              if (!Object.keys(this._handler).length) {
                delete this._handlers;
              }
            }
          }
          return this;
        },
        _getList: function (type) {
          return this._handlers[type] || (
            this._handlers[type] = []
          );
        },
        _handlers: redefine.later(function(){
          return {};
        })
      }
    );

The pattern used for the `_handlers` property only is an inherited getter replaced on demand with a direct property access, explained in details in [The Power Of Getters](http://webreflection.blogspot.com/2013/01/the-power-of-getters.html) post.

Long story short: we can create 100 instances of `Emitter` and the amount of extra objects will be exactly `100` instead of `200` considering a handler created during initialization.

With this pattern, only when the `_handlers` object is needed is created once per instance and set as property to avoid calling the getter per each access.
When listeners are removed, both Array used as type list and `_handlers` are removed, if empty. In order to obtain the same behavior in ES5:

    // ES5
    Object.defineProperties(
      Emitter.prototype,
      {
        emit: {
          value: function (type, data) {
            if (type in this._handlers) {
              this._handlers[type].forEach(emit, data);
            }
            return this;
          }
        },
        on: {
          value: function (type, handler) {
            var list = this._getList(type);
            list.indexOf(handler) < 0 && list.push(handler);
            return this;
          },
        }
        off: {
          value: function (type, handler) {
            var list = this._getList(type),
                i = list.indexOf(handler);
            if (-1 < i) {
              list.splice(i, 1);
              if (!list.length) {
                delete this._handlers[type];
                if (!Object.keys(this._handler).length) {
                  delete this._handlers;
                }
              }
            }
            return this;
          }
        },
        _getList: {
          value: function (type) {
            return this._handlers[type] || (
              this._handlers[type] = []
            );
          }
        },
        _handlers: {
          get: function () {
            Object.defineProperty(
              this, "_handlers", {
                configurable: true,
                value: {}
              }
            );
            return this._handlers;
          }
        }
      }
    );

#### Real World Example: A Safer Definition
While `Object.defineProperties(object, descriptorsList)` second argument loops only through `hasOwnProperty(key)`, once it comes to property definition, and the same is for `Object.defineProperty(obj, key, descriptor)`, the object used to described the property looks up for inherited properties too and consider them.

Even if defaults are `{writable: false, enumerable: false, configurable: false}`, it's easy to make every property `enumerable` and `configurable` simply doing this:

    Object.prototype.configurable = true;
    Object.prototype.enumerable = true;

After above malicious piece of code, if you think a constant variable defined like this cannot be changed you are wrong:

    Object.defineProperty(window, "myLibrary", {value:myLibrary});

It is necessary indeed to ensure that defaults are written as well, making defaults meaningless because of inheritance, but even worse, if a malicious code will write `Object.prototype.writable = true` and there are getters or setters involved, these will all throw an exception because `writable` does not accept getters or setters.

##### How To Prevent Problems in ES5
In ES5 every descriptor should inherit from `null` otherwise no descriptor will be immune from possible attacks.

Here an example of few problems we might want to avoid:

    // set up the nasty environment
    Object.prototype.configurable =
    Object.prototype.enumerable =
    Object.prototype.writable = true;
    
    // verify that there are actually problems
    try {
      Object.defineProperty(this, "problem", {get: function () {
        return "we gonna have bad time";
      }});
    } catch(o_O) {
      console.log("ouch!");
      Object.defineProperty(this, "problem", {value:true});
      console.log(this.propertyIsEnumerable("problem")); // true
      this.problem = {}; // no problems
      delete this.problem; // true again
    }

Accordingly, every single descriptor should be created via `Object.crete(null)` so our code should look like

    function descriptor(object) {
      // now don't take this wrong
      // but this function is almost
      // as big as the whole redefine.js library
      // I would not go through this pattern
      for (var
        nullDescriptor = Object.create(null),
        properties = [
          "configurable",
          "enumerable",
          "writable",
          "get",
          "set",
          "value"
        ],
        i = properties.length; i--;
        object.hasOwnProperty(properties[i]) && (
          nullDescriptor[properties[i]] = object[properties[i]]
        )
      );
      return nullDescriptor;
    }
    
    Object.defineProperty(this, "problem", descriptor({
      value: "now we talk"
    }));
    
    this.propertyIsEnumerable("problem"); // false
    this.problem = {}; // nope
    delete this.problem; // false
    this.problem; // "now we talk"

Got it? Now ...

##### How To Prevent Problems in redefine.js

    redefine(this, "problem", "solved");
    
    this.propertyIsEnumerable("problem"); // false
    this.problem = {}; // nope
    delete this.problem; // false
    this.problem; // "solved"

If you are wondering about **performance** there are many things to consider behind `redefine.js` and one of these is that performance are really good for what it offers.

While is usually slightly slower on desktop, `redefine.js` is [almost as fast in older Android 2.3 devices](http://jsperf.com/redefine-js) where performance matters the most.

`redefine.js` is indeed suitable for mobile phones, even if quite old!







