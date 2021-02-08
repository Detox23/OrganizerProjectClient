import {combineReducers } from 'redux';
import {reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import taskReducer from './taskReducer';
import spinnerReducer from './spinnerReducer';
import datesReducer from './datesReducer';
export default combineReducers({
    tasks: taskReducer,
    auth: authReducer,
    form: formReducer,
    spinner: spinnerReducer,
    dates: datesReducer
});