redefine.js
===========
a lightweight yet powerful ES5 utility.

[![build status](https://secure.travis-ci.org/WebReflection/redefine.png 'travis')](http://travis-ci.org/WebReflection/redefine)

## Obsolete
The most updated, future proof, actively maintained, and widely compatible way to define classes is [es-class](https://github.com/WebReflection/es-class#es-class).

If you are here to enrich prototypes, please have a look at `es-class`, it will most likely provide everything you need and  much more.

If you are here to be able to lazily assign properties to a generic object or prototype, please check [lazyval](https://github.com/WebReflection/lazyval#lazyval).



### About Redefine JS
This ~1.5KB (minified and gzipped) framework brings the power of ES5 and ES6 features in node.js and all modern mobile or desktop browsers.

Main features:

  * **ES6** like **classes** definition with extra power via `mixin` and `bound` magic
  * **ES5** **properties** definition without descriptors paranoia and prolix syntax
  * **ES3** **friendly** and mostly compatible

All common tasks to organize your objects access, definition, and inheritance, can be achieved via `redefine.js` goodness.

### Classes
One thing really frequent in JS world, one thing not so easy to get right if not familiar with ES5: the JavaScript **Class** concept from other OOP languages.

Well, with tests included on top of all features, `redefine.Class(definition)` now offers a semantic utility to safely create classes in JavaScript.

```JavaScript
var Lib = redefine.Class({

  extend: SuperLib,  // inheritance

  mixin: oneOrMoreObject, // mixin
         Constructor

  statics: {         // statics
    someMethod: function () {},
    someProperty: 0
  },
                      // common definition
  method1: function () {},
  property1: null

                      // constructor
  constructor: function Lib() {
    //implicit initialization
    // never invoked if extended via other classes
  }
});
```
All properties tested and fully covered, included the very special case where you want to use `this.super(argN)` in inherited methods or constructor. No performance impact if you don't use it, not a single problem if you are under strict code and don't want to allow `callback.caller` access, you use what you want/need when you want/need, how easy is that? Enjoy! (now back to the problem ...)


### The Problem
ES5 verbosity is not just annoying, is also *spaghetti prone*. The inability to group few descriptors together for one or more properties is inefficient too because of the amount of garbage we create at runtime to define all properties we need.

```javascript
// classic ES5 syntax
Object.defineProperties(
  SomeClass.prototype,
  {
    method: {
      value: function () {
        // the method
      }
    },
    property: {
      enumerable: true,
      value: "the property"
    }
  }
);
```

To define one method and one property we have used 3 extra objects: the properties wrapper, and each property descriptor. In case we were planning to make a list of properties all enumerable, as well as we could decide for writable or configurable, we would have repeated that pattern all over, resulting in a giant piece of JavaScript that will look like `enumerable:true` and nothing else. We also have some difficulty to understand what is each property about because the way we are familiar with is this one:

```javascript
// the familiar JS approach
SomeClass.prototype = {
  method: function () {
    // the method
  },
  property: "the property"
};
```

Above snippet is not just more elegant and clean, is also better at runtime and much easier to read. In ES5, as example, when we see a function is not necessarily because that is a method, it might be a getter or setter too so we have to pay a lot of attention when we look at the code.

### The Solution
So why cannot we have the best from both worlds? An easy to read and naturally understand syntax with the ability to switch ES5 power *on or off on demand*?

```javascript
// redefine.js
redefine(
  SomeClass.prototype, {
  method: function () {
    // the method
  },
  property: "the property"
});
```

The best part about `redefine.js` is its **ambiguity free** approach, granted by hidden classes understood at definition time, a technique that lets us switch `power on` when and if needed. As example, the very first `Object.definePropeties` snippet is not just setting properties, is also defining one of them as `enumerable`.

```javascript
// identical to initial snippet
redefine(
  SomeClass.prototype, {
  method: function () {
    // the method
  },
  property: redefine.as({
    enumerable: true,
    value: "the property"
  })
});
```

The powerful simplified API lets us define **defaults** too, so imagine we want that all properties should be `configurable`, `enumerable`, and `writable` because we expect exactly same *ES3* behavior. This is what you would be forced to do in ES5:

```javascript
// ES5 has no defaults
Object.defineProperties(
  SomeClass.prototype,
  {
    method: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function () {
        // the method
      }
    },
    property: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "the property"
    }
  }
);
```

It's kinda hard to tell anymore what is that code about, don't you agree? Now let's compare against `redefine()`

```javascript
// redefine.js
redefine(
  SomeClass.prototype,
  {
    method: function () {
      // the method
    },
    property: "the property"
  },

  // optional 3rd argument for defaults
  {
    configurable: true,
    enumerable: true,
    writable: true
  }
);
```

We focus on the definition of our meant behavior, rather than on each descriptor property. If we apply defaults in groups, the code will be much more organized too. Bear in mind that defaults can be overwritten by semantic `redefine.as()` definition.

```javascript
redefine(
  object,
  {
    prop: as({
      enumerable: false,
      value: theValue
    })
  },
  {
    enumerable: true
  }
);
```

### A Simplified Object.create
We all have to consider that current descriptors verbosity and concept is ["*trolling*" major ECMAScript experts in the world](https://mail.mozilla.org/pipermail/es-discuss/2012-November/026716.html) too. `Object.create` is not natural for JS developers and it makes things more complex than ever. Same descriptors verbosity applied for what should be the `new function` substitute ... in this sense it was a failure! How about redefining objects from others?

```javascript
// ES5 Object.create
var instance = Object.create(
  sourceObject,
  {
    name:
    {
      value: "instance"
    },
    age:
    {
      value: 34
    },
    toString:
    {
      value: function () {
        // isn't the `this` ambiguous here ?
        // I would expect to refer to the toString descriptor
        return "Hi, I am " + this.name + ", and I am " this.age;
      }
    }
  }
);

// redefine.js
var instance = redefine.from(
  sourceObject,
  {
    name: "instance",
    age: 34,
    toString: function () {
      return "Hi, I am " + this.name + ", and I am " this.age;
    }
  }
);
```

I hope you agree that every time we define a method where `this` is used inside another context, as the descriptor is, looks so confusing!
The descriptor is just an object and it could be used differently in other pieces of logic so that if invoked a part everything will fail there.

In few words, `redefine.js` can also be **less ambiguous** than ES5!

### Lazy Property Definition Pattern Included
I have described this pattern in [The Power Of Getters](http://webreflection.blogspot.com/2013/01/the-power-of-getters.html) entry in my blog.

However, these two comments left me with too many thoughts about ES5 and the fact that really is not easy to understand for developers.

> **Adrien Risser** ... Andrea, every post of yours is a brainfuck! Understanding barely most of what you describe, I can't say I see how I would use all of or just a part of it in any project of mine.

or even worst ...

> **jonz** ... Right now this *syntax seems like obfuscation but the patterns it supports are what I've always wanted*, I wonder if it will ever become familiar.

So you are right guys, the way ES5 lets us implement amazing new patterns and possibilities is even hard to understand or imagine. This is why `redefine.js` comes with a pattern many other programming languages can only dream about: the memory efficient and performance oriented **inherited getter replaced on demand with a direct property access**! (BOOM, I know your mind just blown!)

```javascript
// what you would do today in ES3 classes
function MyClass() {
  this.handlersIMightNeed = {};
  this.propertiesIMightLookFor = [];
  this.stuffNotSureIfEvenUse = {};
  this.methodThatShouldBindWhenNeeded =
    this.method.bind(this);
}
```

Above snippet creates 4 extra objects per each instance of `MyClass`. This is a [memory disaster prone approach plus is really slow during instance creation](http://jsperf.com/the-power-of-getters-element) you can easily compare checking the *Element_Getter* results across all browsers and engines. We also force our syntax to be ES3 because if the prototype of MyClass would have been defined via `Object.defineProperties()` and these were not `configurable` or `writable`, this is what we should really do in order to have an equivalent behavior in our code.

```javascript
// what we should do if MyClass.prototype
// was defined with these properties as defaults
function MyClass() {
  Object.defineProperty(this,
    "handlersIMightNeed", {value: {}});
  Object.defineProperty(this,
    "propertiesIMightLookFor", {value: []});
  Object.defineProperty(this,
    "stuffNotSureIfEvenUse", {value: {}});
  Object.defineProperty(this,
    "methodThatShouldBindWhenNeeded",
    {value: this.method.bind(this)});
}
```

This ain't going anywhere, and this is why ES5 is keeping developers far away from its goodness. So, how about `redefine.later()` to obtain the desired pattern ?

```javascript
var later = redefine.later;
// redefine.js lazy getter replacement
function MyClass(){
  // nothing to do here
  // it cannot be faster!
}
redefine(
  MyClass.prototype,
  {
    handlersIMightNeed: later(function(){
      return {};
    }),
    propertiesIMightLookFor: later(function(){
      return [];
    }),
    stuffNotSureIfEvenUse: later(function(){
      return {};
    }),
    methodThatShouldBindWhenNeeded: later(function(){
      return this.method.bind(this);
    })
  }
);
```

There, a **zero costs** runtime instance creation where all those properties will be assigned as direct properties, rather than getters, when and only if the instance is using, or better, accessing them. These properties are also all deletable by default, unless specified differently, so that it's easy to reset hard a property and reassign it later on when, and if, needed.

### More Robust Than ES5
There is a potential hole in ES5 specifications about descriptors, inherited properties are considered too. This is an example of how to destroy any library I know based on ES5:

```javascript
// malicious code
Object.prototype.get = function screwed(){
  // deal with it
};
Object.prototype.configurable =
Object.prototype.enumerable =
Object.prototype.writable = true;

// your code
var o = Object.defineProperty({}, "key", {value: "value"});
```

**TypeError** `Invalid property. 'value' present on property with getter or setter.`

This would never happen in `redefine.js` world.

```javascript
var o = redefine({}, "key", "value");
o.key; // "value", all good
```

Happy coding!

### API

#### redefine(obj, properties)
This is the main function and the only exported object. It does basically one thing but it has different overloads to do that:

  * `redefine(obj:Object, key:string, value:any[, defaults:Object]):Object`, returns the first argument and define a value straight forward using ES5 defaults unless specified differently.
This signature has these two kind of overloads
  * `redefine(obj:Object, key:string, value:As[, defaults:Object]):Object`, returns the first argument and define a property `key` using `redefine.as({descriptor})` as value descriptor. `As` is an internal, private, class that overrides any default, if specified, or inherited behavior.
  * `redefine(obj:Object, key:string, value:Later[, defaults:Object]):Object`, returns the first argument and define a property `key` as lazily accessed and replaced as direct property that could be deleted at any time in order to reuse the inherited getter. `Later` is an internal, private, class that overrides any default, if specified, or inherited behavior.
  * `redefine(obj:Object, properties:Object[, defaults:Object])`, returns the first argument, it does exactly what other overloads do in this case looping through own properties in the specified `properties` Object.

#### redefine.from(proto)
This semantic method is similar to ES5 `Object.create` except descriptors are those accepted by `redefine()` and `defaults` can be used as well.

  * `redefine.from(source:object[, properties:Object[, defaults:Object]]):Object` returns a new instance where `source.isPrototypeOf(returnedObject)`. Please note `null` is possible too and the second argument, optional as optional is the third one, can be used to redefine properties.
  * `redefine.from(Class:Function[, properties:Object[, defaults:Object]]):Object` returns an `instanceof Class`, using `Class.prototype` as extend.

Here an example:

```javascript
var son = redefine.from(
  ClassName, {age: 123}
);
son.age; // 123
son instanceof ClassName; // true
ClassName.prototype.isPrototypeOf(son); // true
```

Creating instances from classes is the most common pattern in JS but if it's really needed to extend a function , rather than its prototype, this method is not the best one but it's possible to hack this behavior, if really needed, in an ugly way such `function df(){} df.prototype = Class; var o = redefine.from(df);`. Highly discouraged, user defined instance of functions cannot be even invoked, just saying...

#### redefine.as(descriptor)
This semantic method returns an `instanceof As` with properties specified in the `descriptor` addressed once at initialization time.

```javascript
var ES3Like = redefine.as({
  enumerable: true,
  configurable: true,
  writable: true
});

// later on, reused to define all ES3 classes
redefine(
  MyES3Class.prototype,
  {... all properties here ...},
  ES3Like // as defaults
);
```

#### redefine.later(Object)
This semantic method returns an `instanceof Later` object which aim is to be recognized later on in order to define a lazy getter replacement with direct property access pattern, an innovative pattern described in [The Power Of Getters](http://webreflection.blogspot.com/2013/01/the-power-of-getters.html) post.

```javascript
var setAsObjectLaterOn = redefine.later(function (){
  return {};
});

// in some class
redefine(
  MyEvent.prototype,
  {
    handlers: setAsObjectLaterOn
  }
);

// so that no property is created runtime
var me = new MyEvent;
// but only, and once, when/if needed
me.handlers.test = listener;
```

It is possible to use a descriptor in order to overwrite the default configuration for this use case which is `{configurable:true, writable:false, enumerable:false}`. In this case, the `value` should be the callback able to return the lazily defined property.

```javascript
var setAsObjectLaterOn = redefine.later({
  writable: true,     //we want be able to change it later on
  enumerable: true,   // shows up in for/in loops
  configurable: false,// once define there's no way to delete it
  value: function (){
    return {};
  }
});
```

I see what you are thinking about: "*What? How can those properties have value and writable if we are defining a getter?*" Did I mention this method is called `later()` because is later that the property is define through the inherited getter ? :-)

#### redefine.using(descriptor)
This is to simplify partial implementations. As example, to use redefine to create enumerable properties:

```javascript
var enumerable = redefine.using({
  enumerable: true
});

// any property we want
var o = enumerable({}, "test", 123);
o.propertyIsEnumerable("test"); // true
o.test; // 123
````

### Libraries Compatibility
The `redefine.js` API is compatible with [Underscore](http://underscorejs.org) and [Lo-Dash](http://lodash.com) too as `_.redefine` utility. Bear in mind, **you don't need these libraries** at all, in fact `redefine.js` is completely dependencies free but in order to avoid global scope pollution the `redefine` function is defined into a global `_` object. If this is not present it is created, while if it's already there, is simply enriched.

In *node.js* you can use require

    npm install redefine

```javascript
var
  redefine = require('redefine'),
  // redefine = require('redefine').redefine, works too
  as = redefine.as,
  from = redefine.from,
  later = redefine.later
;
```

### Browsers And Engines Compatibility
It is possible to enhance redefine targets using some partial polyfill of ES5 `Object` methods such `create` or [inherit](https://gist.github.com/4397807) and `defineProperty`. However, this library is targeting all browsers supported by [jQuery 2.0](http://blog.jquery.com/2012/07/01/jquery-1-9-and-2-0-tldr-edition/) so here the list:

  * Internet Explorer 9 and greater
  * Chrome, and mobile
  * Firefox, and mobile
  * Opera, and mobile
  * Safari, and mobile
  * Webkit stock browsers for mobile
  * node.js
  * Rhino

Other server side engines such **Ringo** should be supported too since these are compatible with ES5 and ES5.1. The best way to know if your device, browser, or server side JS engine is working is to [grab wru](https://github.com/WebReflection/wru) and run those tests :-)


### 100% Code Coverage
You can check examples and all tests to `redefine()`, `redefine.as(descriptr)`, `redefine.later(function value(){})`, or `redefine.from(proto)` in [this redefine.js file](https://github.com/WebReflection/redefine/blob/master/test/redefine.js).

To launch tests in **node.js** simply this:

    npm install wru
    wru test/redefine.js

To launch tests in any browser simply do `open test.html` in OSX or just double click the test.html file. If your browser needs a web server in order to load files locally, simply this:

    npm install polpetta
    polpetta ./

then check [your localhost/test.html](http://127.0.0.1:1337/test.html) page and it should be green.


### Shut Up And Give Me Code !
You can find the [source code here](https://github.com/WebReflection/redefine/blob/master/src/redefine.js) and the [minified version here](https://github.com/WebReflection/redefine/blob/master/build/redefine.js).

As you can see, once minzipped the library is **about 0.6 KB** and for an easier life enriched with new patterns I think is hard to expect a lighter utility.

### De Facto Targets
These are those situations where you might want to use `redefine.js`

  * `node.js` development, or generally speaking any ES5 capable server side environment. The fact `redefine.js` is more robust should be an extra reason to adopt it.
  * Smartphones, since nowadays, all of them support ES5
  * modern desktop browsers and modern libraries

Enjoy!

