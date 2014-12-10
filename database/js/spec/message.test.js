var MessageModel = require('../models/message');

describe("Message model", function () {

  var MESSAGE_API_RESPONSE = {
    'id': "1234567890",
    'source_guid': "GUID",
    'created_at': 1302623328,
    'user_id': "1234567890",
    'group_id': "1234567890",
    'name': "John",
    'avatar_url': "http://i.groupme.com/123456789",
    'text': "Hello world ☃☃",
    'system': true,
    'favorited_by': [
      "101",
      "66",
      "1234567890"
    ],
    'attachments': [{
      'type': "location",
      'lat': "40.738206",
      'lng': "-73.993285",
      'name': "GroupMe HQ"
    }, {
      'type': "emoji",
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

  it("should parse basic properties", function () {
    var message = MessageModel.parse(MESSAGE_API_RESPONSE);

    expect(message['id']).toEqual("1234567890");
    expect(message['source_guid']).toEqual("GUID");
    expect(message['created_at']).toEqual(1302623328);
    expect(message['user_id']).toEqual("1234567890");
    expect(message['group_id']).toEqual("1234567890");
    expect(message['name']).toEqual("John");
    expect(message['avatar_url']).toEqual("http://i.groupme.com/123456789");
    expect(message['text']).toEqual("Hello world ☃☃");
    expect(message['system']).toEqual(true);
    expect(message['favorited_by']).toEqual([
      "101",
      "66",
      "1234567890"
    ]);
  });

  it("should parse the 'attachments' property", function () {
    var message = MessageModel.parse(MESSAGE_API_RESPONSE);

    var attachments = message['attachments'];
    expect(attachments.length).toEqual(2);

    var locationAttachment = attachments[0];
    expect(locationAttachment['attachment_type']).toEqual("location");
    expect(locationAttachment['attachment_data']).toEqual({
        'lat': "40.738206",
        'lng': "-73.993285",
        'name': "GroupMe HQ"
    });

    var emojiAttachment = attachments[1];
    expect(emojiAttachment['attachment_type']).toEqual("emoji");
    expect(emojiAttachment['attachment_data']).toEqual({
        'placeholder': "☃",
        'charmap': [ [1,42], [2,34] ]
    });
  });

});
