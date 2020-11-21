import React from 'react';
import Tasks from './Tasks.jsx';
import TodoList from "./TodoList";

const TodoListContainer = () => (
    <div className="col-5">
        <TodoList />
        <Tasks />
    </div>
);
export default TodoListContainer;