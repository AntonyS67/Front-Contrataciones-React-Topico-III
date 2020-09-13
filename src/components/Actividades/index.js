import React, { Fragment, useEffect } from 'react';
import BackButton from '../Elements/BackButton';
import {Link,useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getActivities} from '../../reducers/Actividades/action';
import {getCategory} from '../../reducers/Categorias/action';

function Actividades() {
    let {categoryId} = useParams();
    const dispatch = useDispatch();
   
    useEffect(() => {
        const obtenerActividades = () => dispatch(getActivities(categoryId));
        const obtenerCategory = () => dispatch(getCategory(categoryId));
        obtenerActividades();
        obtenerCategory();
    },[dispatch,categoryId]);
        
    const actividades = useSelector(state => state.actividades.activities);
    const categoria = useSelector(state => state.categorias.categoria);
    if(Object.keys(actividades)< 0) return null;
    return (
        <Fragment>
            <BackButton title="Actividades"/>
            <div className="block-content block-content-full mb-50 bg-white text-center mt-50">
                <p className="font-weight-bold">Seleccione un trabajo que solicitara</p>
                <h3 className="mb-4 text-primary font-weight-bold text-uppercase">{categoria.name}</h3>
                <div className="form-group ">
                    {
                        actividades.map(actividad => (
                            <Link key={actividad.id} to={"/tasks/activity/"+actividad.id} className="btn btn-sm btn-primary btn-block text-uppercase mb-4 py-2">{actividad.name}</Link>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default Actividades
