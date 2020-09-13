import {
    GET_ACTIVIDADES,
    GET_ACTIVIDAD
} from './type';

import clientAxios from '../../config/axios';

export function getActivities(category_id){
    return async dispatch => {
        try {
            const respuesta = await clientAxios.get(`/api/activity/category/${category_id}`);
            dispatch({type:GET_ACTIVIDADES,payload:respuesta.data.data})
        } catch (error) {
            console.log(error);
        }
    }
}

export function getActivity(id){
    return async dispatch => {
        try {
            const respuesta = await clientAxios.get(`/api/activity/${id}`);
            dispatch({type:GET_ACTIVIDAD,payload:respuesta.data.data})
        } catch (error) {
            console.log(error);
        }
    }
}