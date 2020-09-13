import {
    SAVE_FORM,
    GET_FORM,
} from './type';

export function saveForm(data){
    return async dispatch => {
        try {
            dispatch({type:SAVE_FORM,payload:data})
        } catch (error) {
        }
    }
}



