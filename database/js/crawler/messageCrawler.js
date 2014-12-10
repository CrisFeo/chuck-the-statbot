var R = require('ramda');
var crawlerUtils = require('./crawlerUtils');
var constants = require('../constants');


/**
 * Retrieve a message batch from the desired group, taking a before_id as the
 * only argument.
 **/
var fetchMessageBatch = crawlerUtils.fetchMessages(
  constants.API_KEY,
  constants.MESSAGE_FETCH_SIZE,
  constants.GROUP_ID
);

/**
 * Map all raw message objects from the groupMe API to Message models.
 **/
var parseAllMessages = R.map(crawlerUtils.parseMessage);

/**
 * Save each message in the passed list and pass the list to the next stage of
 * the pipeline.
 **/
var tapSaveAllMessages = utilities.tapFn(
  R.forEach(crawlerUtils.saveMessage)
);

/**
 * Grabs the id of the last Message model in the passed list.
 **/
var getLastMessageId = R.pipe(
  R.last,
  R.get('id')
);

/**
 * Parse a batch of messages starting from the passed before_id. Returns the
 * id of the last parsed message.
 **/
var parseMessageBatch = R.pipe(
  fetchMessageBatch,
  parseAllMessages,
  tapSaveAllMessages,
  getLastMessageId
);

/**
 * Iteratively parse all messages in the group.
 */
var parseAllGroupMessages = utilities.loopPipeUntil(
  R.eq(undefined),
  parseMessageBatch
);


/* ==== Module exports ==== */
module.exports = {
  'parseAllGroupMessages': parseAllGroupMessages
}
