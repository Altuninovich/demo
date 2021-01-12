import React from "react";
import { connect } from 'react-redux';
import * as actions from "../../actions/index";
import Subscriptions from "./Subscriptions";

const mapStateToProps = (state) => ({
    usersInSubscription: state.usersInSubscription,
})

const SubscriptionsContainer = (props) => {
    return <Subscriptions usersInSubscription={props.usersInSubscription}/>
}

export default connect(mapStateToProps)(SubscriptionsContainer)