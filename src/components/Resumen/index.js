import React, { Fragment, useEffect, useState } from 'react'
import clientAxios from '../../config/axios';
import BackButton from '../Elements/BackButton'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Error from '../Elements/Error';


function Resumen({form,ofertante,tarea,actividad,success}) {
    const [cost,setCost] = useState(0.0);
    const [error,setError] = useState(false);
    const [message,setMessage] = useState('');
    let history = useHistory();

    useEffect(() => {
        let total = Number(ofertante.provider_task_cost)*Number(form.hours)*Number(form.people);
        setCost(total);
    })

    
    //data: task_id,provider_id,address,start_date,end_date,start_time,number_people,number_hours,total
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            task_id:tarea.id,
            provider_id:ofertante.provider_id,
            start_date:form.start_date,
            end_date:form.end_date,
            address:form.location,
            start_time:form.start_time,
            number_people:form.people,
            number_hours:form.hours,
            total:cost
        };

        swal({
            title: "Estas seguro?",
            icon: "info",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                clientAxios.post(`/api/hiring/create`,data)
                .then((response) => {
                    if(response.data.success){
                        swal({
                            title:"Contrato exitoso",
                            icon:"success"
                        })
                        .then((ok)=>{
                            if(ok){
                                history.push('/')
                            }
                        })
                    }else{
                        setError(true);
                        setMessage('Algo salio mal');
                        return;
                    }
                })
                .catch(error => {
                    setError(true);
                    setMessage('Algo salio mal');
                    return;
                });
                setError(false);
            }
        });

    }    

    return (
        <Fragment>
            <BackButton title="Resumen"/>
            <div  className={`block-content block-content-full bg-white mt-50 ${error ? 'mb-100' : 'mb-50'}`}>
                <button className="btn btn-sm btn-primary btn-block text-uppercase mb-4 py-2" >{actividad.name}</button>
                <div className="card align-item-center" style={{borderRadius:"10px"}}>
                    <img src={"http://localhost/api-contrataciones"+ofertante.provider_image} className="card-img-top" alt={ofertante.provider_name} width="126px" height="126px" />
                    <div className="card-body text-left">
                        <h5 className="card-title text-center text-uppercase">{ofertante.provider_name}</h5>
                        <p className="card-text"><strong>Tarea Designada: </strong>{tarea.name}</p>
                        <p className="card-text"><strong>Ubicación </strong>{form.location}</p>
                        <p className="card-text"><strong>Fecha Inicial: </strong>{form.start_date.getDate()}/{form.start_date.getMonth() +1}/{form.start_date.getFullYear()}</p>
                        <p className="card-text"><strong>Fecha Final: </strong>{form.end_date.getDate()}/{form.end_date.getMonth() +1}/{form.end_date.getFullYear()}</p>
                        <p className="card-text"><strong>Hora de Servicio: </strong>
                            {form.start_time.getHours()}:{form.start_time.getMinutes() === 0 ? form.start_time.getMinutes()+'0' : form.start_time.getMinutes() }
                        </p>
                        <p className="card-text"><strong>N° Horas: </strong>{form.hours}</p>
                        <p className="card-text"><strong>N° Personas </strong>{form.people}</p>
                        <p className="card-text"><strong>Costo del Servicio </strong>S/{cost}</p>
                    </div>
                </div>
            </div>
            {
                error
                ?
                    <Error message={message}/>
                :
                null
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
                    }}>
                    <div className="ml-2 mr-2">
                        <span className="pull-left" style={{cursor:"pointer"}}>
                            Cancelar <i className="fas fa-times"></i>
                        </span>
                        <span className="pull-right" style={{cursor:"pointer"}} onClick={handleSubmit}>
                            Aceptar <i className="fas fa-check-circle"></i>
                        </span>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}

const matchStateToProps = (state) => ({
  form:state.form.form,
  ofertante:state.ofertantes.bidder,
  tarea:state.tareas.task,
  actividad:state.actividades.activity
})
export default connect(matchStateToProps,{})(Resumen)
