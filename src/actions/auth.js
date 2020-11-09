import streams from '../apis/streams';
import {
    SIGN_IN
} from './types';


export const signin = (user) => async dispatch => {
    const response = await streams.post(`/api/auth/signin`, user)
    dispatch({type: SIGN_IN, payload: response.data})
}