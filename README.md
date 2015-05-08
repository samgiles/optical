# Optical

Assert the optimisation status of a function in v8 given some arguments.

Note: for this to work node must be run with the `--allow_natives_syntax`
flag. See caveats.

## API

### `optical(func, args, thisArg)`

Prints the optimisation status of a function applied to the given arguments.

### `assertOptimized(func, args, thisArg)`

Assert the optimisation status of a function applied to some arguments.  Will
throw an assertion error if the function is not optimised or will lkely be
deoptimised.

## Example

```JS
var optical = require('optical');

function myFunction(x, y) {
	return x + y;
}

optical.assertOptimized(myFunction, [10, 20]);

function notOptimized(x, y) {
	try {
       myFunction(x, y);
	} catch(e) {
    	console.log(e);
		throw e;
	}
}
// Throws assertion error, can't optimise method
// containing try/catch.
optical.assertOptimized(notOptimized, [10, 20]);
```

## Caveats

1. Node must be run with the `--allow_natives_syntax` flag.
2. This only tests optimisation for given arguments, if your function is polymorphic you won't get a true representation of optimisation status here.

# License

MIT


