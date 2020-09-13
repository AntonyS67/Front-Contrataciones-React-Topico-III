import {
    GET_ACTIVIDADES,
    GET_ACTIVIDAD,
} from './type';

// Cada reducer tiene su propio state
const initialState = {
    activities:[],
    activity:[]
}

export default function(state = initialState,action){
    switch (action.type) {
        case GET_ACTIVIDADES:
            return {
                ...state,
                activities:action.payload
            }
        case GET_ACTIVIDAD:
            return {
                ...state,
                activity:action.payload
            }
        default:
            return state;
    }
}
