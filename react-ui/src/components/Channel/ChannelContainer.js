import * as actionCreators from '../../actions/actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Channel from './Channel';

const mapStateToProps = (state) => {
  return { ...state,
           user: state.user,
           playlist: state.playlist,
           searchSongs: state.searchSongs
         };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
