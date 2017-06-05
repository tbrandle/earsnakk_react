import { createHandler } from 'redux-socket.io-connect';

export default createHandler({
  LOAD: (context, action) => {
    const { dispatch, client } = context;
    const { uri } = action;
    const payload = getDataFromPath(uri);
    
    client.emit('hello,' 'and another thing');
    
   dispatch({
      type: 'SEND_URI',
      payload
    });
  }
});