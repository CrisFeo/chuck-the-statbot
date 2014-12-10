var R = require('ramda');

/** Returns a boolean indicating whether 'list' contains 'value' **/
var isNotInList = R.curryN(2, // Curry to two arguments b/c R.not is nullary
  R.not(
    R.flip(R.contains) // Flip so R.contains args are (list, value)
  )
);


/* ==== Module exports ==== */
module.exports = {

  /** Returns an object which does not contain any specified fields. **/
  pickWithoutFields: R.curry(function (excluded, object) {
    return R.pickWith(
      R.flip( // Flip so predicate args are (key, value)
        isNotInList(excluded)
      ),
      object
    );
  })

};
