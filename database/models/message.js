var R = require('ramda');
var mongoose = require('mongoose');
var modelUtils = require('./modelUtils');

/* ==== Schema Definition  ==== */
var messageSchema = mongoose.Schema({
  id:           String,
  source_guid:  String,
  created_at:   Number,
  user_id:      String,
  group_id:     String,
  name:         String,
  avatar_url:   String,
  text:         String,
  system:       Boolean,
  favorited_by: [String],
  attachments:  [{
    type: String,
    data: String
  }]
});

/* ==== Static Methods ==== */

/** Parse a JSON data object into a message object **/
messageSchema.statics.parseFromJSON = function (data) {
  //Transform functions for the attachments field.
  var parseAttachmentData = function (attachmentData) {
    return {
      type: attachmentData["type"],
      data: modelUtils.pickWithoutFields(["type"], attachmentData).toJSON()
    };
  };
  var parseAllAttachmentData = R.map(parseAttachmentData);
  var getAttachmentData = R.get("attachments");
  var getParsedAttachments = R.pipe(getAttachmentData, parseAllAttachmentData);

  // Map all the simple fields
  var mapSimpleFields = modelUtils.pickWithoutFields(["attachments"]);
  var message = new this(mapSimpleFields(data));
  message.attachments = getParsedAttachments(data);

  return message;
};

/* ==== Module exports ==== */
module.exports = mongoose.model("Message", messageSchema);
