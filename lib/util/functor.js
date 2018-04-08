'use strict';

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _flowRight = require('lodash/flowRight');

var _flowRight2 = _interopRequireDefault(_flowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// flow

var Functor = function Functor(x) {
    this.val = x;
};
Functor.of = function (x) {
    return new this(x);
};

Functor.prototype.map = function (f) {
    return new this.constructor(f(this.val));
};
// class Functor {
//   static of(x){
//         console.log('this',this)
//       return new Functor(x)
//   }  
//   constructor(val) { 
//     this.val = val 
//   }

//   map(f) {
//     // console.log(this.constructor)
//     return new this.constructor(f(this.val))
//   }
// }
// Functor.of = function(x){
//     return new Functor(x)
// }

Functor.of(3);

var Maybe = function Maybe(x) {
    Functor.call(this, x);
};
Maybe.of = function (x) {
    return new Maybe(x);
};

Maybe.prototype = (0, _create2.default)(Functor.prototype);
Maybe.prototype.constructor = Maybe;
Maybe.prototype.isNothing = function () {
    return this.val === undefined || this.val === null;
};
Maybe.prototype.map = function (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.val));
};

var Either = function Either(left, right) {
    this.left = left;
    this.right = right;
};
Either.prototype = (0, _create2.default)(Functor.prototype);
Either.prototype.constructor = Either;
Either.of = function (left, right) {
    return new Either(left, right);
};
Either.prototype.map = function (f) {
    return this.right ? Either.of(this.left, f(this.right)) : Either.of(f(this.left), this.right);
};

var add = function add(x) {
    return x + 1;
};

// console.log('Either',Either.of(1,null).map(add).right)
function parseJSON(json) {
    try {
        return Either.of(null, JSON.parse(json));
    } catch (e) {
        return Either.of(e, null);
    }
}
// console.log(parseJSON().left)


var maybe = Maybe.of(Maybe.of(Maybe.of({ name: 'Mulburry', number: 8402 })));

var Monad = function Monad(x) {
    Functor.call(this, x);
};
Monad.prototype = (0, _create2.default)(Functor.prototype);
Monad.prototype.constructor = Monad;
Monad.of = function (x) {
    return new Monad(x);
};
Monad.prototype.join = function () {
    return this.val;
};
Monad.prototype.flatMap = function (f) {
    var functor = this.map(f);
    return functor.join();
};
// class Monad extends Functor {
//    static of(x){
//     return new Monad(x)
//    }
//   join() {
//     return this.val
//   }
//   flatMap(f) {
//     return this.map(f).join()
//   }
// }

var pipe = function pipe(x) {
    return x;
};

var monad = Monad.of(Monad.of(Monad.of(9)));
// console.log(monad.flatMap(pipe).flatMap(pipe))
// console.log(maybe)


var map = (0, _curry2.default)(function (f, a) {
    return a.map(f);
});
var filter = (0, _curry2.default)(function (f, a) {
    return a.filter(f);
});
var eq = (0, _curry2.default)(function (x, y) {
    return x == y;
});
// var eq = (x, y) => {console.log({x,y})}
var getParam = function getParam(url) {
    return function (key) {
        return map();
    };
};

// console.log(getParam)


var split = (0, _curry2.default)(function (token, str) {
    return str.split(token);
});

var reduce = function reduce(f, arr) {
    return arr.reduce(f, {});
};

var first = function first(arr) {
    return arr[0];
};
var last = function last(arr) {
    return arr[arr.length - 1];
};
var last2 = function last2(arr) {
    console.log(arr);
};

var url = window.location.href;
// var parms = compose( split('&'), first ,split('#'), last, split('?') )
// console.log(compose( map( compose((key)=>{console.log(key[0])return key} , split('=')) ), parms)(url))
// console.log(compose( last,first, filter(compose( eq('age') , first)), map(  split('=') ), parms)(url))


module.exports = {
    Functor: Functor,
    Maybe: Maybe

    // console.log(Functor.of('x'))
    // console.log(Maybe.of('Maybe'))
    // console.log(new Functor('x'))


    // class Functor {
    //     static of(x){
    //         return new Functor(x)
    //     }
    //     constructor(x){
    //         this.val = x
    //     }

    // }
    // 

};var aaaaa = 343;
var aaaaa2 = 343;
// let bbb3:string = 55
var bbb4 = 55;

/**
 * Reducer
 */
function isLongEnough(str) {
    return str.length >= 5;
}

function isShortEnough(str) {
    return str.length <= 10;
}

var words = ["You", "have", "written", "something", "very", "interesting"];

// var ret = words
//     .filter( isLongEnough )
//     .filter( isShortEnough )
// ["written","something"]


function isCorrectLength(str) {
    return isLongEnough(str) && isShortEnough(str);
}

var ret2 = words.filter(isCorrectLength);

// console.log(ret2)

function strUppercase(str) {
    return str.toUpperCase();
}
function strConcat(str1, str2) {
    return str1 + str2;
}

// function strUppercaseReducer(list,str) {
//     list.push( strUppercase( str ) )
//     return list
// }

// function isLongEnoughReducer(list,str) {
//     if (isLongEnough( str )) list.push( str )
//     return list
// }

// function isShortEnoughReducer(list,str) {
//     if (isShortEnough( str )) list.push( str )
//     return list
// }

// var ret3 = words
//     .reduce( isShortEnoughReducer, [] )
//     .reduce( isLongEnoughReducer, [] )


function listCombination(list, val) {
    return list.concat([val]);
}

function filterReducer(predicateFn, combinationFn) {
    return function reducer(list, val) {
        if (predicateFn(val)) {
            return combinationFn(list, val);
        }
        return list;
    };
}
var cfilterReducer = (0, _curry2.default)(filterReducer);
// var isShortEnoughReducer = filterReducer( isShortEnough, listCombination )
// var isLongEnoughReducer = filterReducer( isLongEnough, listCombination )
var isShortEnoughReducer = cfilterReducer(isShortEnough);
var isLongEnoughReducer = cfilterReducer(isLongEnough);

// console.log(isLongEnoughReducer(isShortEnoughReducer(listCombination)))


// var ret4 = words
//     .reduce( isShortEnoughReducer, [] )
//     .reduce( isLongEnoughReducer, [] )

var langAndShort = (0, _flowRight2.default)(isLongEnoughReducer, isShortEnoughReducer)(listCombination);

// console.log(langAndShort)

var ret4 = words.reduce(function (val, key) {
    return langAndShort(val, key);
}, []).map(strUppercase).reduce(strConcat);
// .reduce( langAndShort, [] )

// console.log('ret4: ',ret4)