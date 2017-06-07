import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';

import CreateChannel from './CreateChannel';

const mapStateToProps = (state) => {
  return { ...state, user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);
