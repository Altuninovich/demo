import {createSelector} from "reselect";

const getUsersSelector = (state) => {
    return state.users
};
export const getUsersSuperSelector = createSelector(getUsersSelector, (users) => {
    return users.filter((u) => true);//здесь производим сложные вычисления
})
