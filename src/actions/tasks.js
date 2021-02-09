import {
    GET_TASKS_PERSON,
    HIDE_SPINNER,
    SHOW_SPINNER,
    CREATE_NEW_TASK
} from './types';
import { Api } from '../apis/api';


export const removeTask = (id) => async dispatch => {
    dispatch({type: SHOW_SPINNER})
    new Api().delete(`/api/tasks/${id}`).then(response =>{
        console.log(response)
        dispatch({type: GET_TASKS_PERSON, payload: response.data})
        dispatch({type: HIDE_SPINNER})
    }, error => {
        console.log(error)
        dispatch({type: HIDE_SPINNER})
    })
}

export const getTasksPerson = () => async dispatch => {
    dispatch({type: SHOW_SPINNER})
    new Api().get(`/api/tasks/`).then(response=>{
        dispatch({type: GET_TASKS_PERSON, payload: response.data})
        dispatch({type: HIDE_SPINNER})
    }, error =>{
        dispatch({type: GET_TASKS_PERSON, payload: []})
        dispatch({type: HIDE_SPINNER})
    });
}

export const getTasksPersonForDay = (date) => async dispatch => {    
    new Api().get(`/api/tasks/${date}`).then(response=>{
        dispatch({type: GET_TASKS_PERSON, payload: response.data})
        dispatch({type: HIDE_SPINNER})
    }, error =>{
        dispatch({type: GET_TASKS_PERSON, payload: []})
        dispatch({type: HIDE_SPINNER})
    });
}

export const createTask = (task) => async dispatch =>{
    dispatch({type: SHOW_SPINNER})
    new Api().post(`/api/tasks/`, task).then(response =>{
        dispatch({type: GET_TASKS_PERSON, payload: response.data})
        dispatch({type: HIDE_SPINNER})
    }, error =>{
        console.log(error);
        dispatch({type: HIDE_SPINNER})
    });
}

export const showCreateTaskModal = (value) => async dispatch => {
    dispatch({type: CREATE_NEW_TASK, payload:value})
}
