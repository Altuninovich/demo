import React from "react";
import s from './Users.module.css';
import userPhoto from '../../assets/images/avatar.jpg'
import {NavLink} from "react-router-dom";
import Paginator from "../Paginator/Paginator";
import {Card, Button} from "react-bootstrap";

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
                    <Card style={{ width: '18rem' }}>
                        <NavLink to={`/profile/${user.id}`}>
                        <Card.Img variant="top" src={user.photos.small || userPhoto} className={s.userAvatar} />
                        </NavLink>
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>
                                {user.status}
                            </Card.Text>
                            {user.followed
                                ? <Button disabled={disableSubscriptionButtons[user.id]}
                                          onClick={unsubscribe(user.id)}>Unfollow</Button>
                                : <Button disabled={disableSubscriptionButtons[user.id]}
                                          onClick={subscribe(user.id)}>Follow</Button>}
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
};

export default Users;