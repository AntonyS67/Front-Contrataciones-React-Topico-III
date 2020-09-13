import {
    GET_TAREAS,
    GET_TAREA,
} from './type';

// Cada reducer tiene su propio state
const initialState = {
    tasks:[],
    task:[]
}

export default function(state = initialState,action){
    switch (action.type) {
        case GET_TAREAS:
            return {
                ...state,
                tasks:action.payload
            }
        case GET_TAREA:
            return {
                ...state,
                task:action.payload
            }
        default:
            return state;
    }
}
