import React from "react";
import s from './Users.module.css';

const Preloader = () => <div className={s.preloader}>
    <div className={s.spinner}></div>
</div>;

export default Preloader;
