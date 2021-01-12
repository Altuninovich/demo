import * as api from "../api/api";
import {stopSubmit} from "redux-form";
import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const removeTask = createAction('TASK_REMOVE');
export const toggleTaskState = createAction('TASK_STATE_TOGGLE');

export const addPost = (post) => ({
    type: 'ADD_POST',
    payload: {
        post,
    }
});

export const deletePost = (id) => ({
    type: 'DELETE_POST',
    payload: {
        id,
    },
});

export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: {
        message,
    },
});

export const changeSubscription =(id) => ({
    type: 'SUBSCRIPTION',
    payload: {
        id,
    },
});

export const setUsers =(data) => ({
    type: 'SET_USERS',
    payload: {
        data,
    },
});

export const changeUsers = (data, numPage) => ({
    type: 'CHANGE_USERS',
    payload: {
        data,
        numPage,
    }
});

export const togglePreloader = (isFetching) => ({
    type: 'IS_FETCHING',
    payload: {
        isFetching,
    }
});

export const  setUserProfile = (user) => ({
    type: 'SET_USER_PROFILE',
    payload: {
        user,
    }
});

export const setUserStatus = (status) => ({
    type: 'SET_STATUS',
    payload: {
        status,
    }
})

export const setUserData = ({id, email, login}) => ({
    type: 'SET_USER_DATA',
    payload: {
        data: {id, email, login},
    }
});

export const blockSubscriptionButton = (id) => ({
    type: 'BLOCK',
    payload: {
        id,
    }
});

export const unblockSubscriptionButton = (id) => ({
    type: 'UNBLOCK',
    payload: {
        id,
    }
});

export  const deleteAuth = () => ({
    type: 'DELETE_AUTH',
});

export const savePhotoSuccess = (photo) => ({
    type: 'SAVE_PHOTO_SUCCESS',
    payload: {
        photo,
    }
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: 'GET_CAPTCHA_URL_SUCCESS',
    payload: {
        captchaUrl,
    }
});

export const addUserToSubscription = (user) => ({
    type: "ADD_USER_TO_SUBSCRIPTION",
    payload: {
        user,
    }
});

export const deleteUserToSubscription = (id) => ({
    type: "DELETE_USER_TO_SUBSCRIPTION",
    payload: {
        id,
    }
})

export const getUsersThunk = () => async (dispatch) => {
    dispatch(togglePreloader(true));
    const response = await api.usersAPI.getUsers()
        dispatch(togglePreloader(false));
        dispatch(setUsers(response));
};

export const changeUsersThunk = (numPage) => async (dispatch) => {
     dispatch(togglePreloader(true));
        const response = await api.usersAPI.getUsers(numPage)
            dispatch(togglePreloader(false));
            dispatch(changeUsers(response, numPage));
};

export const unsubscribeThunk = (user) => async (dispatch) => {
    dispatch(blockSubscriptionButton(user.id));
            const response = await api.followAPI.unsubscribe(user.id)
                        if (response === 0) {
                            dispatch(changeSubscription(user.id));
                            dispatch(deleteUserToSubscription(user.id));
                        }
                dispatch(unblockSubscriptionButton(user.id));
};

export const subscribeThunk = (user) => async (dispatch) => {
    dispatch(blockSubscriptionButton(user.id));
            const response = await api.followAPI.subscribe(user.id)
                        if (response === 0) {
                            dispatch(changeSubscription(user.id));
                            dispatch(addUserToSubscription(user));
                        }
                dispatch(unblockSubscriptionButton(user.id));
};

export const getUserProfileThunk = (userId) => async (dispatch) => {
    const response = await api.profileAPI.getProfile(userId)
        dispatch(setUserProfile(response));
        dispatch(getStatusThunk(userId));
};

export const getStatusThunk = (userId) => (dispatch) => {
    api.profileAPI.getProfileStatus(userId).then(data => {
        dispatch(setUserStatus(data));
    })
};

export const updateStatusThunk = (status) => async (dispatch) => {
    try {
        const response = await api.profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    } catch (e) {
        //alert(e.message)
    }
};
export const getAuthUserDataThunk = () => (dispatch) => {
    return api.authAPI.authenticationGet().then(data => {
        if (data.resultCode === 0) {
            dispatch(setUserData(data.data));
        }
    })
};

export const authenticationDeleteThunk = () => async (dispatch) => {
    const response = await api.authAPI.authenticationDelite()
        if (response === 1) {
            dispatch(deleteAuth());
        }
};

export const serverError = (error) => ({
    type: 'SERVER_ERROR',
    payload: {
        error,
    }
});
export const noServerError = () => ({
    type: 'NO_SERVER_ERROR'
});

export const initializedSuccess = () => ({
    type: 'INITIALIZED_SUCCESS'
})

export const initializeAppThunk = () => (dispatch) => {
    let promise = dispatch(getAuthUserDataThunk());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        })
};

export const authenticationPostThunk = ({login, password, rememberMe}) => async (dispatch) => {
    const data = await api.authAPI.authenticationPost(login, password, rememberMe)
        if (data.resultCode === 0) {
            dispatch(getAuthUserDataThunk());
            dispatch(noServerError());
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            dispatch(serverError(data.messages[0]));
        }
};

export const savePhotoThunk = (filePhoto) => async (dispatch) => {
    const response = await api.profileAPI.savePhoto(filePhoto);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};

export const saveProfileThunk = (profile) => async (dispatch, getState) => {
    //const userId = getState().authentication.id;пример как можно взять id вторым пораметром указав getState
    const response = await api.profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(setUserProfile(profile));
        //dispatch(getUserProfileThunk(userId));пример как можно взять id вторым пораметром указав getState
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
        /*
        const error = response.data.messages[0]
        const nameField = error.slice(error.indexOf('>')+1, error.indexOf(')')).toLocaleLowerCase();;
        dispatch(stopSubmit("edit-profile", {'contacts': {[nameField]: error}}))
        return Promise.reject(response.data.messages[0]);
        */
        //второй вариант реализации когда подсвечивается ошибкой конкретный Field .
    }
};

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await api.securityAPI.getCaptchaUrl();
    dispatch(getCaptchaUrlSuccess(response.data.url));
};