var R = require('ramda');

/* Returns a boolean indicating whether 'list' contains 'value' */
var isNotInList = R.not(R.flip(R.contains));

module.exports = {

  /* Returns an object which does not contain any specified fields. */
  pickWithoutFields: function (excluded, object) {
    return R.pickWith(isNotInList(excluded), object);
  }

};
