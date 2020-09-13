import {
    GET_CATEGORIAS,
    GET_CATEGORIA,
} from './type';

import clientAxios from '../../config/axios';

export function getCategorias(){
    return async dispatch => {
        try {
            const respuesta = await clientAxios.get('/api/category');
            dispatch({type:GET_CATEGORIAS,payload:respuesta.data})
        } catch (error) {
            console.log(error);
        }
    }
}

export function getCategory(id){
    return async dispatch => {
        try {
            const respuesta = await clientAxios.get(`/api/category/${id}`);
            dispatch({type:GET_CATEGORIA,payload:respuesta.data.data})
        } catch (error) {
            console.log(error);
        }
    }
}
