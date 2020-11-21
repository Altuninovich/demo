import React from 'react';
import s from './Posts.module.css';
import  {connect} from 'react-redux';
import * as actions from '../../../actions/index';

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
    }
};


const actionCreators = {
    deletePost: actions.deletePost,
}
window.props = [];
const Posts = (props) => {
    const {deletePost, posts} = props;
    window.props.push(props);
    const changeRemove = (id) => (e) => {
        e.preventDefault();
        deletePost(id);
    }

    return (
        <div className={s.posts}>
            {posts.map(({text, id}) => (
                    <div key={id} className={s.post}>
                        <img src='https://stihi.ru/pics/2019/05/31/1320.jpg'/><a>  {text}</a>
                        <button type="button" className="close" onClick={changeRemove(id)}><span>&times;</span></button>
                    </div>
                )
            )}
        </div>
    )
};

export default connect(mapStateToProps, actionCreators)(Posts);