import {
    GET_OFERTANTES,
    GET_OFERTANTE,
} from './type';

import clientAxios from '../../config/axios';

export function getOfertantes(task_id){
    return async dispatch => {
        try {
            const respuesta = await clientAxios.get(`/api/provider/task/${task_id}`);
            dispatch({type:GET_OFERTANTES,payload:respuesta.data.data})
        } catch (error) {
        }
    }
}

export function getOfertante(id,taskId){
    return async dispatch => {
        try {
            const respuesta = await clientAxios.get(`/api/provider/${id}/task/${taskId}`);
            dispatch({type:GET_OFERTANTE,payload:respuesta.data.data})
        } catch (error) {
        }
    }
}

