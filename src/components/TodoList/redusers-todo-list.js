import _ from 'lodash';
import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

const tasks = handleActions({
    [actions.addTask](state, { payload: { task } }) {
        const { byId, allIds } = state;
        return {
            byId: { ...byId, [task.id]: task },
            allIds: [task.id, ...allIds],
        };
    },
    [actions.removeTask](state, { payload: { id } }) {
        const { byId, allIds } = state;
        return {
            byId: _.omit(byId, id),
            allIds: _.without(allIds, id),
        };
    },
    [actions.toggleTaskState](state, { payload: { id } }) {
        const task = state.byId[id];
        const newState = task.state === 'active' ? 'finished' : 'active';
        const updatedTask = { ...task, state: newState };
        return {
            ...state,
            byId: { ...state.byId, [task.id]: updatedTask },
        };
    },
}, { byId: {}, allIds: [] });

export default tasks
