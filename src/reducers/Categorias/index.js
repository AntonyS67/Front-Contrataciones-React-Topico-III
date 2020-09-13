import {
    GET_CATEGORIAS,
    GET_CATEGORIA,
} from './type';

// Cada reducer tiene su propio state
const initialState = {
    categorias:[],
    categoria:[]
}

export default function(state = initialState,action){
    switch (action.type) {
        case GET_CATEGORIAS:
            return {
                ...state,
                categorias:action.payload
            }
        case GET_CATEGORIA:
            return {
                ...state,
                categoria:action.payload
            }
        default:
            return state;
    }
}
