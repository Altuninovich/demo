import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tasks from "../components/TodoList/redusers-todo-list";


const messages = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [ ...state, action.payload.message];
        default:
            return  state;
    }
};

export const posts = (state = [{id: 12345, text: 'in Nicaragua'}], action) => {
    switch (action.type) {
        case 'ADD_POST':
            return [ action.payload.post, ...state ];
        case 'DELETE_POST':
            return state.filter((post) => post.id !== action.payload.id);
        default:
            return state;
    }
};



const disableSubscriptionButtons = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USERS': {
            const {items} = action.payload.data;
            //формируем обьект {id: false,}
            return items.reduce((acc, user) => ({ ...acc, [user.id]: false }), {})
        }
        case 'CHANGE_USERS': {
            const {items} = action.payload.data;
            //формируем обьект {id: false,}
            return items.reduce((acc, user) => ({ ...acc, [user.id]: false }), {})
        }
        case 'BLOCK':
            return { ...state, [action.payload.id]: true};
        case 'UNBLOCK':
            return { ...state, [action.payload.id]: false};
        default:
            return state;

    }
}

const users = (state = [], action) => {
    switch (action.type) {
        case 'SUBSCRIPTION': {
            return state.map((user) => {
                if (user.id === action.payload.id) {
                    const newValue = user.followed ? false : true;
                    return { ...user, followed: newValue}
                }
                return  user;
            })
        }
        case 'SET_USERS': {
            return [ ...action.payload.data.items];
        }
        case 'CHANGE_USERS': {
            return [ ...action.payload.data.items];
        }
        default:
            return  state;

    }
}

const pages = (state = {currentPage: 1, numberPages: 0}, action) => {
    switch (action.type) {
        case 'SET_USERS': {
            const {items, totalCount} = action.payload.data;
            return { ...state, numberPages: totalCount};
        }
        case 'CHANGE_USERS': {
            return { ...state, currentPage: action.payload.numPage}
        }
        default:
            return  state;
    }
}

const isFetching = (state = true, action) => {
    switch (action.type) {
        case 'IS_FETCHING': {
            return action.payload.isFetching;
        }
        default:
            return state;
    }
}

const userProfile = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER_PROFILE': {
            return action.payload.user;
        }
        case 'SAVE_PHOTO_SUCCESS':
            return { ...state, photos: action.payload.photo}
        default:
            return  state;
    }
}

const userStatus = (state = 'hei', action) => {
    switch (action.type) {
        case 'SET_STATUS': {
            if (action.payload.status === null) {
                return 'NO STATUS';
            }
            return action.payload.status;
        }
        default:
            return state;
    }
}

const initAuthState = {
    id: null,
    email: null,
    login: 'who it is' ,
    isAuth: false,
    captchaUrl: null, // if null, then captcha is not required
}
const authentication = (state = initAuthState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return { ...state,
                ...action.payload.data,
                isAuth: true,
            }
        case 'DELETE_AUTH':
            return { ...initAuthState, isAuth: false};
        case 'GET_CAPTCHA_URL_SUCCESS':
            return { ...state, captcha: action.payload.captcha};
        default:
            return state;
    }
}

const dataServerErrorFormValidation = (state = null, action) => {
    switch (action.type) {
        case 'SERVER_ERROR':
            return action.payload.error;
        case 'NO_SERVER_ERROR':
            return null;
        default:
            return state;
    }
}

const appReducer = (state = false, action) => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return true;
        default:
            return state;
    }
};

export default combineReducers({
    tasks,
    messages,
    posts,
    users,
    pages,
    isFetching,
    userProfile,
    authentication,
    disableSubscriptionButtons,
    userStatus,
    form: formReducer,
    dataServerErrorFormValidation,
    appReducer,
});