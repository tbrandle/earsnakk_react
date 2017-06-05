
function testReducer(state = {}, action) {
  console.log('test reducer');
  switch(action.type) {
    case 'message':
      return Object.assign({}, {message:action.data});
    default:
      return state;
  }
}

export default testReducer;