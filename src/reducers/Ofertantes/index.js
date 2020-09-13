import {
    GET_OFERTANTES,
    GET_OFERTANTE,
} from './type';

// Cada reducer tiene su propio state
const initialState = {
    bidders:[],
    bidder:[]
}

export default function(state = initialState,action){
    switch (action.type) {
        case GET_OFERTANTES:
            return {
                ...state,
                bidders:action.payload
            }
        case GET_OFERTANTE:
            return {
                ...state,
                bidder:action.payload
            }
        default:
            return state;
    }
}