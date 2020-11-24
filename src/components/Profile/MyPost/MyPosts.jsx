import React from "react";
import * as actions from '../../../actions/index';
import _ from 'lodash';
import  {connect} from 'react-redux';
import s from './MyPosts.module.css';
import Posts from "./Posts";
import {Field, reduxForm} from "redux-form";
import { maxLength, required, required2} from "../../../utils/validators";
import {Textarea} from "../../FormsControls/FormsControls";

const actionCreators = {
    addPost: actions.addPost,
};
let  reset;

const maxLength5 = maxLength(20);
const AddNewPostForm = (props) => {
    reset = props.reset;

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name="newPostText"
                    type="text"
                    component={Textarea}
                    label="Username"
                    validate={[maxLength5, required]}
                />
            </div>
            <div>
                <button>ADD</button>
            </div>
        </form>
    )
};
const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

const MyPosts = (props) => {
    const {addPost} = props;

    const submitPost = (values) => {
        const post = {text: values.newPostText, id: _.uniqueId()};
        addPost(post);
        reset();
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={submitPost}/>
            <div className={s.item}>New post</div>
            <Posts/>
        </div>
    )
};


export default connect(null, actionCreators)(MyPosts);