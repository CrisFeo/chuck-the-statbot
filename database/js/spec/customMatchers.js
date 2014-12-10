beforeEach(function() {
  jasmine.addMatchers({
    toBeInstanceOf: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var pass = actual instanceof expected;
          var message = "Expected " + actual + " to be instance of " + expected
          if (pass) {
            message = "";
          }
          return {
            'pass': pass,
            'message': message
          };
        }
      };
    }
  });
});
