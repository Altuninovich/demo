import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/Navbar";
import { Route, Redirect, withRouter } from 'react-router-dom';
import Dialogs from "./components/Dialogs/DialogsWithHooks";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/LoginPage";
import * as actions from "./actions";
import {connect} from 'react-redux';
import {compose} from "redux";
import Preloader from "./components/Users/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import TodoListContainer from "./components/TodoList/TodoListContainer";
import SubscriptionsContainer from "./components/Subscriptions/SubscriptionsContainer";
//const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs')); // Ленивая загрузка

const mapStateToProps = (state) => ({
    appReducer: state.appReducer,
})

const actionCreators = {
    initializeAppThunk: actions.initializeAppThunk,
}

class App extends React.Component {
    catchAllUnhandledErrors = (reason, promise) => {
        //alert("Some error occured");
    }

    componentDidMount() {
        this.props.initializeAppThunk();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.appReducer) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <LoginPage/>}/>
                    <Route path='/tasks' render={() => <TodoListContainer/>}/>
                    <Route path='/subscriptions' render={() => <SubscriptionsContainer/>}/>
                </div>
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, actionCreators),
)(App);