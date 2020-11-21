import React from 'react';
import Header from "./Header";
import * as actions from '../../actions/index';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    authentication: state.authentication,
})

const actionCreators = {
    authenticationDeleteThunk: actions.authenticationDeleteThunk,
}

class HeaderContainer extends React.Component {

    render() {
        return <Header { ...this.props }/>
    }
};

export default connect(mapStateToProps, actionCreators)(HeaderContainer);