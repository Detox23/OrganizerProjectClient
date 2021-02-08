import {Api} from '../apis/api';
import {
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
    REMOVE_VIEW_TASKS
} from './types';


export const signin = (user) => async dispatch => {
    new Api().post(`/api/auth/signin`, user).then(
        response => {
            dispatch({type: SIGN_IN, payload: response.data})
        }, error => {
            console.log(error)
        }
    )
}

export const signout = () => async dispatch => {
    dispatch({type: SIGN_OUT})
    dispatch({type: REMOVE_VIEW_TASKS})
}

export const signup = (userRegister) => async dispatch => {
    new Api().post('/api/auth/signup', userRegister).then(
        response => {
            dispatch({type: SIGN_UP, payload:response.data})
        }, error => {
            console.log(error)
        }
    )
}