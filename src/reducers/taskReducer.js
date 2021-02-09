import {
    GET_TASKS_PERSON,
    REMOVE_VIEW_TASKS,
    CREATE_NEW_TASK
} from '../actions/types';

const INITIAL_STATE = {
    showCreateTaskModal: false,
    allTasks: [],
};

export default (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case REMOVE_VIEW_TASKS:            
            return {...state, allTasks: []}
        case GET_TASKS_PERSON:
            var disabledHours = {}
            action.payload.map(x => {
                var startHour = x.startTime[3];
                var startMinute = x.startTime[4];
                for(startHour; startHour <= x.endTime[3]; startHour++){
                    disabledHours[startHour] = []
                    if(startHour === x.startTime[3]){
                        for(startMinute; startMinute <= 45; startMinute = startMinute + 15){
                            disabledHours[startHour.toString()] = [...disabledHours[startHour.toString()], startMinute]
                        }
                    }else if(startHour === x.endTime[3]){
                        var endMinute = 0;
                        for(endMinute; endMinute <= x.endTime[4]; endMinute = endMinute + 15){
                            disabledHours[startHour.toString()] = [...disabledHours[startHour.toString()], endMinute]
                        }
                    }else{
                        var minutesToAdd = 0;
                        for(minutesToAdd; minutesToAdd <= 45; minutesToAdd = minutesToAdd + 15){
                            disabledHours[startHour.toString()] = [...disabledHours[startHour.toString()], minutesToAdd]
                        }
                    }
                }
                return disabledHours;
            })
            return {...state, disabledHours: disabledHours, allTasks: action.payload}
        case CREATE_NEW_TASK:
            return {...state, showCreateTaskModal: action.payload}
        
        default:
            return state;
    }
};