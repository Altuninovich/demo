import React from "react";
import Profile from "./ProfileInfo/Profile";
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import MyPosts from "./MyPost/MyPosts";
import {withRouter} from 'react-router-dom'

const mapStateToProps = (state) => ({
    userProfile: state.userProfile,
    authentication: state.authentication,
    userStatus: state.userStatus,
})

const actionCreators = {
    setUserProfile: actions.setUserProfile,
    getUserProfileThunk: actions.getUserProfileThunk,
    updateStatusThunk: actions.updateStatusThunk,
    getStatusThunk: actions.getStatusThunk,
    savePhotoThunk: actions.savePhotoThunk,
    saveProfileThunk: actions.saveProfileThunk,
}


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authentication.id;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfileThunk(userId);
        this.props.getStatusThunk(userId);
    }

    render() {
        return (
            <div>
                <Profile {...this.props} isOwner={!this.props.match.params.userId}/>
                <MyPosts/>
            </div>
        )
    }
};

const WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, actionCreators)(WithUrlDataContainerComponent);