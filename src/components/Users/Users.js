import React from "react";
import s from './Users.module.css';
import userPhoto from '../../assets/images/avatar.jpg'
import {NavLink} from "react-router-dom";
import Paginator from "../Paginator/Paginator";

const Users = (props) => {

    const {
        users,
        disableSubscriptionButtons,
        unsubscribeThunk,
        subscribeThunk,
        pages: {currentPage, numberPages},
        changeUsersThunk,
    } = props;

    const unsubscribe = (id) => () => {
        unsubscribeThunk(id);

    };

    const subscribe = (id) => () => {
        subscribeThunk(id);

    };

    return (
        <div>
            <Paginator currentPage={currentPage} numberPages={numberPages} changeUsersThunk={changeUsersThunk}/>
            {users.map((user) => (
                <div className={s.user} key={user.id}>
                    <span>
                        <div>
                            <NavLink to={`/profile/${user.id}`}>
                            <img src={user.photos.small || userPhoto} className={s.userAvatar}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={disableSubscriptionButtons[user.id]}
                                          onClick={unsubscribe(user.id)}>Unfollow</button>
                                : <button disabled={disableSubscriptionButtons[user.id]}
                                          onClick={subscribe(user.id)}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>user.location.country</div>
                            <div>user.location.city</div>
                        </span>
                    </span>
                </div>
            ))}
        </div>
    )
};

export default Users;