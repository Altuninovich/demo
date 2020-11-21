import {posts} from "./index";
import React from "react";
import ReactDOM from "react-dom";

const state = [
    {id: 1, text: 'I eat'},
    {id: 2, text: 'flying'},
    {id: 3, text: 'running'},
    {id: 4, text: 'jumping'},
];

const actionAddPost = { type: 'ADD_POST', payload: {post: {id: 5, text: 'Outdoors'}}}
const actionDeletePost = {type: 'DELETE_POST', payload: {id: 3}}

it('length of posts should be incremented', () => {
    let newState = posts(state,actionAddPost);
    expect(newState.length).toBe(5);
});
