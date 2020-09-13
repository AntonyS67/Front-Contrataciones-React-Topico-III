import {
    GET_TAREAS,
    GET_TAREA,
} from './type';

import clientAxios from '../../config/axios';

export function getTareas(activity_id){
    return async dispatch => {
        try {
            const respuesta = await clientAxios.get(`/api/task/activity/${activity_id}`);
            dispatch({type:GET_TAREAS,payload:respuesta.data.data})
        } catch (error) {
        }
    }
}

export function getTarea(id){
    return async dispatch => {
        try {
            const respuesta = await clientAxios.get(`/api/task/${id}`);
            dispatch({type:GET_TAREA,payload:respuesta.data.data})
        } catch (error) {
        }
    }
}


