var R = require('ramda');


/**
 * Reoder tap method that calls the specified function on an object, returning
 * the object.
 **/
var tapFn = R.flip(R.tap);

/**
 * Pipe the result of loopFn back into itself until predicateFn returns false.
 * Returns the result of the last call to loopFn that cause the predicateFn
 * returned false.
 **/
var loopPipeUntil = R.curry(function (predicateFn, loopFn) {
  var loopResult;
  do {
    loopResult = loopFn(loopResult);
  } while(predicateFn(loopResult))
  return loopResult;
});

/* ==== Module exports ==== */
module.exports = {
  'tapFn': tapFn,
  'loopPipeUntil': loopPipeUntil
}
