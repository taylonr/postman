"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Run `npm run test:typescript` to ensure TypeScript works correctly
var chai_1 = require("chai");
//td library under test
var td = require("../..");
var Dog = (function () {
    function Dog() {
    }
    Dog.prototype.bark = function () { };
    return Dog;
}());
var Cat = (function () {
    function Cat() {
    }
    ;
    Cat.prototype.meow = function () { return "meow! meow!"; };
    return Cat;
}());
function sum(first, second) {
    return first + second;
}
var dog = td.constructor(Dog);
td.when(dog.prototype.bark()).thenReturn("woof!");
var bird = td.object({ fly: function () { } });
td.when(bird.fly()).thenReturn("swoosh!");
var kitty = td.object(["scratch", "meow"]);
td.when(kitty.scratch()).thenReturn("scratch!");
td.when(kitty.meow()).thenReturn("meow!");
if (eval("typeof Proxy") !== "undefined") {
    var Bear = (function () {
        function Bear() {
        }
        ;
        Bear.prototype.sleep = function () { };
        ;
        return Bear;
    }());
    ;
    var bear = td.object("A bear");
    td.when(bear.sleep()).thenReturn("zzzzzz");
}
var testObject = {
    funk: function () { }
};
td.replace(testObject, "funk");
td.replace(testObject, "funk", function () { return 42; });
td.replace("../..");
td.replace("../../", 42);
var f = td.function();
td.when(f(10)).thenReturn(10, 11);
td.when(f(1)).thenThrow(new Error("ok"));
td.when(f(td.matchers.isA(String))).thenDo(function (s) { return s; });
td.when(f(td.matchers.not(true))).thenResolve("value1", "value2");
td.when(f(td.matchers.not(false))).thenReject(new Error("rejected"));
var fakeSum = td.function(sum);
td.when(fakeSum(1, 2)).thenReturn(3);
var fakestSum = td.function("sum");
td.when(fakestSum(1, 2)).thenReturn(3);
f();
td.verify(f());
td.verify(f(), { times: 1 });
td.verify(f(), { ignoreExtraArgs: false });
td.verify(f(), { ignoreExtraArgs: true, times: 1 });
var CatFake = td.constructor(Cat);
var cat = new CatFake();
td.when(cat.meow()).thenReturn("moo!");
var explanation = td.explain(f);
console.log(explanation.description, explanation.calls.length, explanation.callCount);
chai_1.assert.equal(explanation.description.split('\n')[0], 'This test double has 5 stubbings and 1 invocations.');
