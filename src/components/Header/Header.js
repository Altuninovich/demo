import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
	const {authenticationDeleteThunk, authentication: {isAuth, login}} = props;
	const logout = () => authenticationDeleteThunk();
	return (
		<header className={s.header}>
			<img src='https://thypix.com/wp-content/uploads/easy-pictures-for-sketching-91.jpg'/>
			<div className={s.loginBlock}>
				<NavLink to={'/login'}>{
					isAuth
						? <div>{login}
							<button onClick={logout}>LOG OUT</button>
						</div>
						: 'Login'
				}
				</NavLink>
			</div>
		</header>
	)
};
export default Header;