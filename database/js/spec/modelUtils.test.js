require('./customMatchers');
var modelUtils = require('../models/modelUtils');

var matchType = function (value) {
  return typeof value;
}

describe("pickWithoutFields", function () {

  it("should be curried to two arguments", function () {
    expect(typeof(
        modelUtils.pickWithoutFields
      )).toEqual('function');
    expect(typeof(
        modelUtils.pickWithoutFields(["type"])
      )).toEqual('function');
    expect(typeof(
        modelUtils.pickWithoutFields(["type"], {type: "blah"})
      )).toEqual('object');
    expect(typeof(
        modelUtils.pickWithoutFields(["type"])({type: "blah"})
      )).toEqual('object');
  });

  it("should properly pick fields", function () {
    var picker = modelUtils.pickWithoutFields(["type"]);
    expect(picker({type: "blah", id: 12})).toEqual({id: 12});
    expect(picker({trope: "blah", id: 12})).toEqual({trope: "blah", id: 12});
  });


});
