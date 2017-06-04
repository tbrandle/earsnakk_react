const { createHandler } = require('redux-socket.io-connect');

createHandler({
  LOAD: (context, action) => {
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