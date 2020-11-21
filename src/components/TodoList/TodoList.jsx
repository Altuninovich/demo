import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/index';

const mapStateToProps = () => {
    const props = {};
    return props;
};

const actionCreators = {
    addTask: actions.addTask,
};

class TodoList extends React.Component {
    handleSubmit = (value) => {
        const {addTask, reset} = this.props;
        const task = { ...value, id: _.uniqueId(), state: 'active'};
        addTask({task});
        reset();
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="form-group mx-3">
                    <Field name="text" required component="input" type="text" />
                </div>
                <input type="submit" className="btn btn-secondary btn-sm" value="Add" />
            </form>
        );
    }
}

const ConnectedNewTodoList = connect(mapStateToProps, actionCreators)(TodoList);
export default reduxForm({
    form: 'newTask',
})(ConnectedNewTodoList);