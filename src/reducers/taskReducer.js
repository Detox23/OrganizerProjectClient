import {
    GET_TASKS_PERSON,
    REMOVE_VIEW_TASKS,
    CREATE_NEW_TASK
} from '../actions/types';

const INITIAL_STATE = {
    showCreateTaskModal: false,
    allTasks: [],
};

const formatDisabledHours = (hour) => {
    if(hour < 10){
        return "0".concat(hour)
    }else{
        return hour.toString();
    }
}

export default (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case REMOVE_VIEW_TASKS:            
            return {...state, allTasks: []}
        case GET_TASKS_PERSON:
            var disabledHours = []
            action.payload.map((x, index) => {
                var startHour = formatDisabledHours(x.startTime[3])
                var startMinute = formatDisabledHours(x.startTime[4])
                var endHour = formatDisabledHours(x.endTime[3])
                var endMinute = formatDisabledHours(x.endTime[4]) 
                return disabledHours.push({from: startHour.concat(":"+startMinute), to: endHour.concat(":"+endMinute)})
            })
            return {...state, disabledHours: disabledHours, allTasks: action.payload}
        case CREATE_NEW_TASK:
            return {...state, showCreateTaskModal: action.payload}
        
        default:
            return state;
    }
};