const topicItemSchema = {
  type: 'object',
  properties: {
    topictype: {
      type: 'string',
    },
    topictext: {
      type: 'string',
    },
    topicgroup: {
      type: 'string',
    },
    topicparent: {
      type: 'string',
    },
    order: {
      type: 'integer',
    },
  },
};

module.exports = topicItemSchema;
