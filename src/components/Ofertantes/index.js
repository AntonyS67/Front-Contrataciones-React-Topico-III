import React, { Fragment, useEffect, useState } from 'react'
import BackButton from '../Elements/BackButton'
import {useHistory,useParams} from 'react-router-dom';
import {getOfertantes, getOfertante} from '../../reducers/Ofertantes/action';
import {getTarea} from '../../reducers/Tareas/action';
import { useSelector, useDispatch } from 'react-redux';
import Error from '../Elements/Error';

function Ofertantes() {
    const [provider,setProvider]=useState('');
    const [error,setError] = useState(false);
    const [message,setMessage] = useState('');

    let history = useHistory();
    let {taskId} = useParams();
    
    const dispatch = useDispatch();
   
    useEffect(() => {
        const obtenerOfertantes = () => dispatch(getOfertantes(taskId));
        const obtenerTarea = () => dispatch(getTarea(taskId));
        obtenerOfertantes();
        obtenerTarea();
    },[dispatch,taskId]);

    const ofertantes = useSelector(state => state.ofertantes.bidders);
    const tarea = useSelector(state => state.tareas.task);
    
    if(Object.keys(ofertantes).length < 0) return null;

    const handleProvider = (e) => {
        setProvider({
            ...provider,
            [e.target.name]:e.target.checked ? e.target.value : null
        })
    }
    const handleClick = (e) => {
        e.preventDefault();
        
        if(provider === ''){
            setError(true);
            setMessage('Selecciona Ofertantes');
            return;
        }
        setError(false);
        dispatch(getOfertante(provider.provider,taskId));
        history.push('/summary')
    }
    
    return (
        <Fragment>
            <BackButton title="Ofertantes"/>
            <div className="block-content block-content-full mb-50 bg-white text-center mt-50">
                <p className="font-weight-bold">Tarea {tarea.name}</p>
                <div className="row ">
                    {
                        ofertantes.map((ofertante,index) => (
                            <div key={ofertante.provider_id} className="col-6 mb-2">
                                <div className="card" style={{width:"8rem",borderRadius:"10px"}}>

                                    <div className="custom-control custom-radio mb-3">
                                        <input type="radio" name="provider" onChange={(e) => handleProvider(e)} value={ofertante.provider_id} className="custom-control-input" id={"customControlValidation"+index} />
                                        <label className="custom-control-label" htmlFor={"customControlValidation"+index}>
                                            <strong>{ofertante.provider_name}</strong>
                                        </label>
                                    </div>
                                    <img src={"http://localhost/api-contrataciones"+ofertante.provider_image} className="card-img-top" alt="" width="126px" height="126px" />
                                    <div className="card-body">
                                        <p className="card-text">Costo: S/{ofertante.provider_task_cost}</p>
                                        <p className="card-text">{ofertante.provider_city}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                error
                ? 
                    <Error message={message}/>
                : null
            }
            <div 
                className="auth-error mt-5"
                style={{
                    backgroundColor: "rgba(255,78,0)",
                    color: "rgba(255,255,255)",
                    zIndex:"0"
                }}
            >
                <div
                    className="error-shake"
                    style={{
                        fontSize:"1rem"
                    }}
                >
                    <div className="ml-2 mr-2">
                        <span className="pull-left">Ofertantes</span>
                        <span className="pull-left">&nbsp;|&nbsp;</span>
                        <span className="pull-left">{ofertantes.length}</span>
                        <span className="pull-right" style={{cursor:"pointer"}} onClick={handleClick}>
                            Siguiente <i className="fas fa-arrow-right"></i>
                        </span>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}

export default Ofertantes
