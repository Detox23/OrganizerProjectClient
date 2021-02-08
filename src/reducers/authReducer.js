import {SIGN_IN, SIGN_OUT} from '../actions/types';
const INITIAL_STATE = {
    isSignedIn: localStorage.getItem("token") === null || localStorage.getItem("token") === undefined ? false: true,
    token: localStorage.getItem("token") === null || localStorage.getItem("token") === undefined ? null: localStorage.getItem("token")
};

export default (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case SIGN_IN:
            localStorage.setItem("token", action.payload.Authorization);
            return {...state, isSignedIn:true, token: action.payload.Authorization};
        
        case SIGN_OUT:
            return {...state, isSignedIn:false, token: null};
        default:
            return state;
    }
};