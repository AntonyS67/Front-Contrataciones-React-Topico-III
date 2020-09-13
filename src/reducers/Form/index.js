import {
    SAVE_FORM,
    GET_FORM,
} from './type';

// Cada reducer tiene su propio state
const initialState = {
    form:[],
}

export default function(state = initialState,action){
    switch (action.type) {
        case SAVE_FORM:
            return {
                ...state,
                form:action.payload
            }
        default:
            return state;
    }
}
