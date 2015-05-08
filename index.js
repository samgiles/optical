var assert = require('assert');
var Optical = {};
Optical.OPTIMISED = 1;
Optical.NOT_OPTIMISED = 2;
Optical.ALWAYS_OPTIMISED = 3;
Optical.NEVER_OPTIMSISED = 4;
Optical.MAY_BE_OPTIMISED = 6;

function testOptimisationStatus(fn, args, thisArg) {
	var n =  10000000;
	while (n >= 0) {
		n--;
		fn.apply(thisArg, args);
	}

	%OptimizeFunctionOnNextCall(fn);
	fn.apply(thisArg, args);

	return %GetOptimizationStatus(fn);
}

function printOptimisationStatus(functionName, status) {
    switch(status) {
		case Optical.OPTIMISED: console.log("Function ", functionName, " is optimized"); break;
        case Optical.NOT_OPTIMISED: console.log("Function ", functionName, " is not optimized"); break;
        case Optical.ALWAYS_OPTIMISED: console.log("Function  ", functionName, " is always optimized"); break;
        case Optical.NEVER_OPTIMISED: console.log("Function  ", functionName, " is never optimized"); break;

        case Optical.MAY_BE_OPTIMISED: console.log("Function  ", functionName, " will probably deoptimize"); break;
    }
}


module.exports = function(func, args, thisArg) {
	printOptimisationStatus(func, testOptimisationStatus(func, args, thisArg));
};

module.exports.assertOptimized = function(func, args, thisArg) {
	var optimisationStatus = testOptimisationStatus(func, args, thisArg);
	assert(optimisationStatus === Optical.OPTIMISED || optimisationStatus === Optical.ALWAYS_OPTIMISED);
};
