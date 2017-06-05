const { createHandler } = require('redux-socket.io-connect');

createHandler({
  SEND_URI: (context, action) => {
    console.log('in the handler');
    const { dispatch } = context;
    const { uri } = action.uri;
    const payload = getDataFromPath(uri);
    
    dispatch({
      type: 'DATA',
      payload
    });
  }
});

module.exports = createHandler;