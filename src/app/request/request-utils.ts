export default {
  CONSTANTS: {
    URL: '/jsonrpc.js',
    COMMAND: '{command}',
    START: '{start}',
    RETURN_TAGS: '{returnTags}',
    PARAMETER: '{parameter}',
    TAGGED_PARAMETERS: '{taggedParameters}',
    TYPE: '{type}',
    ITEMS_PER_RESPONSE: '{itemsPerResponse}',
    PLAYER_ID: '{playerId}',

    DEFAULT_EMPTY: '',
    DEFAULT_START: 0,
    DEFAULT_PAGE_LIMIT: 100,
    DEFAULT_COMMAND: 'add',

    TAG_PREFIX: 'tags: ',
  },

  parseTaggedParameters: function(param: Array<string>): string {
    return param.join('", "');
  },

  parseReturnTags: function(param: Array<string>): string {
    return param.join(',');
  },
};
