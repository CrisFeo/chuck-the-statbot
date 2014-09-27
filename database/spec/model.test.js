var MessageModel = require('../models/message');

describe("Message model", function () {

  var MESSAGE_API_RESPONSE = {
    "id": "1234567890",
    "source_guid": "GUID",
    "created_at": 1302623328,
    "user_id": "1234567890",
    "group_id": "1234567890",
    "name": "John",
    "avatar_url": "http://i.groupme.com/123456789",
    "text": "Hello world ☃☃",
    "system": true,
    "favorited_by": [
      "101",
      "66",
      "1234567890"
    ],
    "attachments": [{
      "type": "image",
      "url": "http://i.groupme.com/123456789"
    }, {
      "type": "image",
      "url": "http://i.groupme.com/123456789"
    }, {
      "type": "location",
      "lat": "40.738206",
      "lng": "-73.993285",
      "name": "GroupMe HQ"
    }, {
      "type": "split",
      "token": "SPLIT_TOKEN"
    }, {
      "type": "emoji",
      "placeholder": "☃",
      "charmap": [
        [
          1,
          42
        ],
        [
          2,
          34
        ]
      ]
    }]
  };

  it("should exist", function () {
    expect(MessageModel).not.toBeUndefined();
  });

  it("should parse basic properties", function () {
    var message = MessageModel.parse(MESSAGE_API_RESPONSE);
    expect(message["id"]).toBe("1234567890");
  })


});
