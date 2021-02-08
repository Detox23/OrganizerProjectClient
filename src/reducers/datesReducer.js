import {CHANGE_DAY} from '../actions/types';
import {getToday} from '../helpers/dateHelpers';

const INITIAL_STATE = {
    date: new Date(getToday()),   
};

export default (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case CHANGE_DAY:
            return {...state, date:action.payload};
        default:
            return state;
    }
};