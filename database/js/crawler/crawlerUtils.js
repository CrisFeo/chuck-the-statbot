var R = require('ramda');
var API = require('groupme').Stateless;
var Message = require('../models/message');


/**
 * Fetches a batch of messages from the groupme API for the given group.
 */
var fetchMessages = R.curry(
  function (accessToken, batchSize, groupId, beforeId) {
    var options = {
      limit: batchSize
    };
    if (arguments.length == 4) {
      options.before_id = beforeId;
    }
    return API.Messages.index.Q(accessToken, groupId, options);
  }
);

var parseMessage = R.unary(Message.parse.bind(Message));

var saveMessage = R.func("save");


/* ==== Module exports ==== */
module.exports = {
  'fetchMessages': fetchMessages,
  'parseMessage': parseMessage,
  'saveMessage': saveMessage
}
