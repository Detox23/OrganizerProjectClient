import {
    CHANGE_DAY
} from './types';

export const changeDay = (date) => async dispatch => {
    dispatch({type: CHANGE_DAY, payload: date})
}
