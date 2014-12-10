require('./customMatchers');
var R = require('ramda');
var constants = require('../constants');
var crawlerUtils = require('../crawler/crawlerUtils');
var Message = require('../models/message');

/* ==== Test Setup Methods ==== */

var getMostRecent = R.lPartial(crawlerUtils.fetchMessages,
  constants.API_KEY,
  constants.MESSAGE_FETCH_SIZE,
  constants.GROUP_ID
);

var get50MostRecent = R.lPartial(crawlerUtils.fetchMessages,
  constants.API_KEY,
  50,
  constants.GROUP_ID
);

var getBeforeSpecificId = R.lPartial(crawlerUtils.fetchMessages,
  constants.API_KEY,
  constants.MESSAGE_FETCH_SIZE,
  constants.GROUP_ID,
  141236667921970115
);

/* ===== Tests ===== */

describe("fetchMessages", function () {
  it("should successfully retrieve results", function (done) {
    getMostRecent().then(function (result) {
      expect(result).not.toBeUndefined();
      expect(result.messages).not.toBeUndefined();
      done();
    });
  });

  it("should retrieve the correct number of results", function (done) {
    get50MostRecent().then(function (result) {
      expect(result.messages.length).toEqual(50);
      done();
    });
  });

  it("should retrieve results before the specified id", function (done) {
    getBeforeSpecificId().then(function (result) {
      expect(result.messages[0].id).toEqual("141236667352548318");
      done();
    });
  });
});

describe("parseMessage", function () {
  it("should create a message model", function (){
    var modelResult = crawlerUtils.parseMessage({
      'id': "1234567890",
      'source_guid': "GUID",
      'created_at': 1302623328,
      'user_id': "1234567890",
      'group_id': "1234567890",
      'name': "John",
      'avatar_url': "http://i.groupme.com/123456789",
      'text': "Hello world ☃☃",
      'system': true,
      'favorited_by': [],
      'attachments': []
    });
    expect(modelResult).toBeInstanceOf(Message);
  });
});

describe("saveMessage", function () {
  //TODO
});
