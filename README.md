# Object-Oriented-JavaScript

###The function Array.prototype.some can be used to iterate over an array, testing each element of that array against a supplied predicate, and returning true as soon as the predicate returns true.
```
var not_A = array.some(function(s) {
   return s !== 'a';
});
If the predicate returns false for every element in the array then the eventual return value of .some is also false.
```
You can also use Array.prototype.every which has the opposite behaviour - it returns false as soon as any predicate test fails, and only returns true if the predicate returns true for every element of the array:
```
var all_A = array.every(function(s) {
    return s === 'a';
});
```
Using Array.prototype.filter is inefficient, since it is required to test every single element in the array with no opportunity to terminate early as soon as a contra-indicating result is found.
 
#The Array native every(), filter(), map(), some(), forEach() methods

ECMAScript 5 defines five native iterative method that's every(), filter(), map(), some(), forEach(); Each of methods accepts two arguments: a function to run on each item and an optional scope object in which to run the function(affection the value of this):

every() method always return a boolean value "true" or "false" that base on run the give function on every item on every item in the array and returns true if function returns true for every true; what's that mean ?,ok, here is an example:
```
var a = [1, 2, 3, 4, 5 ,6],
b = a.every(function(item, index, array){
});
console.log(b);//false 
```
###why ?

if you didn't return anything, this's considered as return things like 'null', you know 'null, undefined, ',NaN' and so on, it's converted as false;
```
var a = [1, 2, 3, 4, 5 ,6],
b = a.every(function(item, index, array){
        return item;
});
console.log(b);//true
```
###why ?

because, there's every item function return true; "why it's return true"?, cos,every item can converted as true;
```
var a = [1, 2, 3,null, 4, 5 ,6],
b = a.every(function(item, index, array){
        return item;
});
console.log(b);//false 
```
###why?

because,in this array they inclued a null item, it function false null, the null was every() converted as false;
```
var a = [1, 2, 3, 3, 4, 5 ,6],
b = a.every(function(item, index, array){
        return item > 0;
});
console.log(b);//true 

var a = [1, 2, 3, 3, 4, 5 ,6],
b = a.every(function(item, index, array){
        return item > 1;
});
console.log(b);//false 
```
this feature almost like Underscorejs every() method,,,,oh,,ok,,sorry, exactly Underscorejs every() method almost same to native javascript array every() method;

reference underscorejs document: http://underscorejs.org/#every

In Summary: 1,every() methods only return two value:true or false; 2,runs the give function on every item, just any function return false; every() will return false, unless every item return true;

ok, what's the second arguments use for?, consider example:
```
['a', 'b', 'c'].every(function(item, index, arr){
    console.log(this);  //window
});

['a', 'b', 'c'].every(function(item, index, arr){
    console.log(this);  //String {0: "r", 1: "i", 2: "c", 3: "h", 4: "a", 5: "r", 6: "d"} 
}, 'richard');   
['a', 'b', 'c'].every(function(item, index, arr){ console.log(this.name);//richardong
}, {name: 'richardong'});
```
some people would curiousness "String {0: "r", 1: "i", 2: "c", 3: "h", 4: "a", 5: "r", 6: "d"} ", that's simple,you can try this: console.log(new String('richardgong'));//String {0: "r", 1: "i", 2: "c", 3: "h", 4: "a", 5: "r", 6: "d", 7: "g", 8: "o", 9: "n", 10: "g"}

through above example, the second every() method arguments is use for affection the first arguments "this" pointer value;

ok, next one:
filter() method, Runs the give function on every item in the array and returns an array of all items for which the function returns true;

here an example:
```
var a = [1, 2, 3, 3, null, 5 ,6,'richardgong', undefined],
b = a.filter(function(item, index, array){              });
console.log(b);//[]
```
###why?

filter just an array of items for which the function returns ture,,,here, obviously, return nothing, so the result array of item is nothing that's an empty array;
```
    var a = [1, 2, 3, 3, null, 5 ,6,'richardgong', undefined],
    b = a.filter(function(item, index, array){
            return item;
    });
    console.log(b);//[1, 2, 3, 3, 5, 6, "richardgong"] 
```
###why? 
because null and undefined can't be conveted as ture, so,it's not retured;
```
    var a = [1, 2, 3, 3, null, 5 ,6,'richardgong', undefined],
    b = a.filter(function(item, index, array){
            return true;
    });
    console.log(b);//[1, 2, 3, 3, null, 5, 6, "richardgong", undefined] 
```
###what's happen?

that's cos evey give function item in the array if it return true, the filter will return this item element itself to create a new array that's the "1, 2, 3, 3, null, 5, 6, "richardgong", undefined] " ;
```
var a = [1, 2, 3, 3, null, 5 ,6,'richardgong', undefined],
b = a.filter(function(item, index, array){
        return index;
});
console.log(b);// [2, 3, 3, null, 5, 6, "richardgong", undefined] 
```
###why ?

you know the array index start as 0, when function return 0 that's conveted as return false; you konw 0 converted to boolean type as false; in this example, the item "1",will not be retured; so,,final result is :[2, 3, 3, null, 5, 6, "richardgong", undefined]
```
var a = [1, 2, 3, 3, null, 5 ,6,'richardgong', undefined],
b = a.filter(function(item, index, array){
        return array;
});
console.log(b);//[1, 2, 3, 3, null, 5, 6, "richardgong", undefined] 
filter method is very usefully, now let's check a famous of javascript library => underscorejs, they how to implementation filter method, consider Code snippets:

(function() {
  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };



  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };


  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };
}).call(this);
here the "_.filter" functions almost same to "native filter", but more compatibility, you know before ie9 version brower ,Array object has not support filter() method,
```
Let's analyze it, consider code:
```
var aa = ['a', 'b', 'c'].filter(function(item, index, arr){
    console.log(this);//String {0: "r", 1: "i", 2: "c", 3: "h", 4: "a", 5: "r", 6: "d", 7: "g", 8: "o", 9: "n", 10: "g"} test.js:2
String {0: "r", 1: "i", 2: "c", 3: "h", 4: "a", 5: "r", 6: "d", 7: "g", 8: "o", 9: "n", 10: "g"} test.js:2 String {0: "r", 1: "i", 2: "c", 3: "h", 4: "a", 5: "r", 6: "d", 7: "g", 8: "o", 9: "n", 10: "g"} return item;
}, 'richardgong');

var bb = _.filter(['a', 'b', 'c'], function(item, index, arr){
        console.log(this);//String {0: "r", 1: "i", 2: "c", 3: "h", 4: "a", 5: "r", 6: "d", 7: "g", 8: "o", 9: "n", 10: "g"} test.js:2
String {0: "r", 1: "i", 2: "c", 3: "h", 4: "a", 5: "r", 6: "d", 7: "g", 8: "o", 9: "n", 10: "g"} test.js:2 String {0: "r", 1: "i", 2: "c", 3: "h", 4: "a", 5: "r", 6: "d", 7: "g", 8: "o", 9: "n", 10: "g"} return item; }, 'richardgong');

console.log("aa:", aa, "bb:", bb);//aa: ["a", "b", "c"] bb: ["a", "b", "c"] 
you can see, the result precisely the same;
```
From underscorejs source code,"if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);", they 're first detection if has native filter() method ,they would use native filter and return result new arrary "obj.filter(iterator, context);" if there's have not native filter,they would use "each" function to iterated object ,and push item to "results" variate, after finished iterate then return "results"; so, "_.filter()" method good compatibility

In Summary: native filter() method should return a new array that make up by the item in an array that give function return true; and filter just return item of give function; item item item....return array item, item item...

ok,,,go on: next one,

forEach() method: runs the given function on every item in the array and it has no returns values, consider an example:
```
var a = [1, 2, 3, 3, null, 5 ,6,'richardgong', undefined],
b = a.forEach(function(k, v, arr){
        console.log('K:',k, "v:", v, "arr:",arr);
});
console.log("b:", b);//K: 1 v: 0 arr: [1, 2, 3, 3, null, 5, 6, "richardgong", undefined] b.js:3
K: 2 v: 1 arr: [1, 2, 3, 3, null, 5, 6, "richardgong", undefined] b.js:3
K: 3 v: 2 arr: [1, 2, 3, 3, null, 5, 6, "richardgong", undefined] b.js:3
K: 3 v: 3 arr: [1, 2, 3, 3, null, 5, 6, "richardgong", undefined] b.js:3
K: null v: 4 arr: [1, 2, 3, 3, null, 5, 6, "richardgong", undefined] b.js:3
K: 5 v: 5 arr: [1, 2, 3, 3, null, 5, 6, "richardgong", undefined] b.js:3
K: 6 v: 6 arr: [1, 2, 3, 3, null, 5, 6, "richardgong", undefined] b.js:3
K: richardgong v: 7 arr: [1, 2, 3, 3, null, 5, 6, "richardgong", undefined] b.js:3
K: undefined v: 8 arr: [1, 2, 3, 3, null, 5, 6, "richardgong", undefined] b.js:3
b: undefined;
forEach() method is very usefully; let's us check underscorejs how to implement it;

    (function() {

      // Baseline setup
      // --------------

      // Establish the root object, `window` in the browser, or `exports` on the server.
      var root = this;

      // Save the previous value of the `_` variable.
      var previousUnderscore = root._;

      // Establish the object that gets returned to break out of a loop iteration.
      var breaker = {};

      // Save bytes in the minified (but not gzipped) version:
      var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

      // Create quick reference variables for speed access to core prototypes.
      var
        push             = ArrayProto.push,
        slice            = ArrayProto.slice,
        concat           = ArrayProto.concat,
        toString         = ObjProto.toString,
        hasOwnProperty   = ObjProto.hasOwnProperty;

      // All **ECMAScript 5** native function implementations that we hope to use
      // are declared here.
      var
        nativeForEach      = ArrayProto.forEach,
        nativeMap          = ArrayProto.map,
        nativeReduce       = ArrayProto.reduce,
        nativeReduceRight  = ArrayProto.reduceRight,
        nativeFilter       = ArrayProto.filter,
        nativeEvery        = ArrayProto.every,
        nativeSome         = ArrayProto.some,
        nativeIndexOf      = ArrayProto.indexOf,
        nativeLastIndexOf  = ArrayProto.lastIndexOf,
        nativeIsArray      = Array.isArray,
        nativeKeys         = Object.keys,
        nativeBind         = FuncProto.bind;

      // Create a safe reference to the Underscore object for use below.
      var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
      };

      // Export the Underscore object for **Node.js**, with
      // backwards-compatibility for the old `require()` API. If we're in
      // the browser, add `_` as a global object via a string identifier,
      // for Closure Compiler "advanced" mode.
      if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
          exports = module.exports = _;
        }
        exports._ = _;
      } else {
        root._ = _;
      }

      // Current version.
      _.VERSION = '1.5.2';

      // Collection Functions
      // --------------------

      // The cornerstone, an `each` implementation, aka `forEach`.
      // Handles objects with the built-in `forEach`, arrays, and raw objects.
      // Delegates to **ECMAScript 5**'s native `forEach` if available.
      var each = _.each = _.forEach = function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, length = obj.length; i < length; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          var keys = _.keys(obj);
          for (var i = 0, length = keys.length; i < length; i++) {
            if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
          }
        }
      };
    }).call(this);
first time "each" would delegates to ECMAScript 5's native forEach if available. they use native forEach to iterate object, else use custom for loop;

0k, here we go. map() method, runs the given function on every item in the array and return

var a = [1, 2, 3, 3, null, 5 ,6,'richardgong', undefined],
b = a.map(function(key, val, array){});
console.log(b);//[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined] 


var a = [1, 2, 3, 3, null, 5 ,6,'richardgong', undefined],
b = a.map(function(key, val, array){
        return null;
    });
console.log(b);//[null, null, null, null, null, null, null, null, null] 



var a = [1, 2, 3, 3, null, 5 ,6,'richardgong', undefined],
b = a.map(function(key, val, array){
        return key;
    });
console.log(b);//[1, 2, 3, 3, null, 5, 6, "richardgong", undefined] 

var a = [1, 2, 3, 3, null, 5 ,6,'richardgong', undefined],
b = a.map(function(key, val, array){
        return key +'richardgong';
    });
console.log(b);//["1richardgong", "2richardgong", "3richardgong", "3richardgong", "nullrichardgong", "5richardgong", "6richardgong", "richardgongrichardgong", "undefinedrichardgong"]
if you didn't return anything, it default return undefined; forEach, map that's diff is forEach has no return values; map return values as an array; you could return anything
```
let's us check underscorejs how to implement _.map() method
```
    (function() {

      // Baseline setup
      // --------------

      // Establish the root object, `window` in the browser, or `exports` on the server.
      var root = this;

      // Save the previous value of the `_` variable.
      var previousUnderscore = root._;

      // Establish the object that gets returned to break out of a loop iteration.
      var breaker = {};

      // Save bytes in the minified (but not gzipped) version:
      var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

      // Create quick reference variables for speed access to core prototypes.
      var
        push             = ArrayProto.push,
        slice            = ArrayProto.slice,
        concat           = ArrayProto.concat,
        toString         = ObjProto.toString,
        hasOwnProperty   = ObjProto.hasOwnProperty;

      // All **ECMAScript 5** native function implementations that we hope to use
      // are declared here.
      var
        nativeForEach      = ArrayProto.forEach,
        nativeMap          = ArrayProto.map,
        nativeReduce       = ArrayProto.reduce,
        nativeReduceRight  = ArrayProto.reduceRight,
        nativeFilter       = ArrayProto.filter,
        nativeEvery        = ArrayProto.every,
        nativeSome         = ArrayProto.some,
        nativeIndexOf      = ArrayProto.indexOf,
        nativeLastIndexOf  = ArrayProto.lastIndexOf,
        nativeIsArray      = Array.isArray,
        nativeKeys         = Object.keys,
        nativeBind         = FuncProto.bind;

      // Create a safe reference to the Underscore object for use below.
      var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
      };

      // Export the Underscore object for **Node.js**, with
      // backwards-compatibility for the old `require()` API. If we're in
      // the browser, add `_` as a global object via a string identifier,
      // for Closure Compiler "advanced" mode.
      if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
          exports = module.exports = _;
        }
        exports._ = _;
      } else {
        root._ = _;
      }

      // Current version.
      _.VERSION = '1.5.2';

      // Collection Functions
      // --------------------

      // The cornerstone, an `each` implementation, aka `forEach`.
      // Handles objects with the built-in `forEach`, arrays, and raw objects.
      // Delegates to **ECMAScript 5**'s native `forEach` if available.
      var each = _.each = _.forEach = function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, length = obj.length; i < length; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          var keys = _.keys(obj);
          for (var i = 0, length = keys.length; i < length; i++) {
            if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
          }
        }
      };

      // Return the results of applying the iterator to each element.
      // Delegates to **ECMAScript 5**'s native `map` if available.
      _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function(value, index, list) {
          results.push(iterator.call(context, value, index, list));
        });
        return results;
      };
    }).call(this);
```
_.map() method, first time delegates to ECMAScript 5's native map if available then use native function and return new array "obj.map(iterator, context);", else use custom each iterator to iterated it; and push item to "results" variate ,when they finished iterated ,then,return results variate;

here we go,

some() method: runs the given function on every item in the array and returns true if the function returns true for any one item; what's the every(), some() method diffence that's if there's at least one of the item return true, some() will return ture;,every() method at least every of the item return true,every() return ture ,else that will be return false; some() will break when item given function return true; every() will break when item give function return false;

for an example:
```
var a = [  null,  null, null, 1],
b = a.some(function(k, v, arr){
    });
console.log(b);//false


var a = [  null,  null, null, 1],
b = a.some(function(k, v, arr){
    return;
    });
console.log(b);//false

var a = [  null,  null, null, 1],
b = a.some(function(k, v, arr){
    return '';
    });
console.log(b);//false


var a = [  null,  null, null, 1],
b = a.some(function(k, v, arr){
    return k;
    });
console.log(b);


var a = [  null,  null, null, 1],
b = a.some(function(k, v, arr){
    return v;
    });
console.log(b);

```
