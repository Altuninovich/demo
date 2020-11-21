import React from "react";
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import Users from "./Users";
import Preloader from "./Preloader";
import {getUsersSuperSelector} from "../../reducers/users-selectors";


const mapStateToProps = (state) => ({
    users: getUsersSuperSelector(state),
    isFetching: state.isFetching,
    disableSubscriptionButtons: state.disableSubscriptionButtons,
    pages: state.pages,
});

const actionCreators = {
    getUsersThunk: actions.getUsersThunk,
    changeUsersThunk: actions.changeUsersThunk,
    unsubscribeThunk: actions.unsubscribeThunk,
    subscribeThunk: actions.subscribeThunk,
}

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersThunk();
    }


    changePage = (numPage) => (e) => {
        this.props.changeUsersThunk(numPage);
    }

    render() {
        const {
            isFetching,
            disableSubscriptionButtons,
            users,
            subscribeThunk,
            unsubscribeThunk,
            pages,
            changeUsersThunk,
        } = this.props;


        return <>
            {isFetching && <Preloader/>}
            <Users
                changePage={this.changePage}
                users={users}
                disableSubscriptionButtons={disableSubscriptionButtons}
                unsubscribeThunk={unsubscribeThunk}
                subscribeThunk={subscribeThunk}
                pages={pages}
                changeUsersThunk={changeUsersThunk}
            />
        </>
    }
};

export default connect(mapStateToProps, actionCreators)(UsersContainer);