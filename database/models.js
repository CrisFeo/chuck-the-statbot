var R = require('ramda');
var mongoose = require('mongoose');
var modelUtils = require('./modelUtils');

/* ==== Message Model/Schema Definition ==== */
var setupMessageModel = function (models) {
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
      type: String
      data: String
    }]
  });

  /* Parse a JSON data object into a message object */
  messageSchema.statics.parseFromJSON = function (data) {
    // Map all the simple fields
    var simpleObject = modelUtils.pickWithoutFields([
      "attachments"
    ], data);
    var message = new this(simpleObject);

    //Map the attachment field
    var getAttachmentData = R.get("attachments");
    var parseAttachmentData = function (attachmentData) {
      return {
        type: attachmentData["type"],
        data: modelUtils.pickWithoutFields(["type"], attachmentData).toJSON()
      };
    };
    var mapAttachmentData = R.map(parseAttachmentData);
    var getAttachments = R.pipe(getAttachmentData, mapAttachmentData);
    message.attachments = getAttachments(data);

    return message;
  };

  return mongoose.model("Message", messageSchema);
}

module.exports = {};
module.exports.initialize = function () {
  // Add the models to the module export
  module.exports = R.mixin(module.exports, {
    Message = setupMessageModel();
  });
}
