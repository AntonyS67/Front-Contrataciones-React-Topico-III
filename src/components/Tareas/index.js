import React, { Fragment, useEffect, useState } from 'react';
import BackButton from '../Elements/BackButton';
import {useHistory, useParams} from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import {getTareas} from '../../reducers/Tareas/action';
import { getActivity } from '../../reducers/Actividades/action';
import {saveForm} from '../../reducers/Form/action';

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale,setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import Error from '../Elements/Error';
registerLocale('es',es)

function Tareas({form}) {
    const [tarea,setTarea] = useState('');
    const [start_date,setStartDate] = useState('');
    const [end_date,setEndDate] = useState('');
    const [location,setLocation] = useState('');
    const [start_time,setStartTime] = useState('');
    const [people,setPeople] = useState(0);
    const [hours,setHours] = useState(0);
    const [error,setError] = useState(false);
    const [message,setMessage] = useState('');

    let history = useHistory();
    let {activityId} = useParams();
    const dispatch = useDispatch();
   
    useEffect(() => {
        const obtenerTareas = () => dispatch(getTareas(activityId));
        const obtenerActivity = () => dispatch(getActivity(activityId));
        obtenerTareas();
        obtenerActivity();
        
        if (form.length > 0) {
            setTarea(form.tarea);
            setStartDate(form.start_date);
            setEndDate(form.end_date);
            setLocation(form.location);
            setStartTime(form.start_time);
            setPeople(form.people);
            setHours(form.hours)
        }
        

    },[dispatch,activityId]);
        
    const tareas = useSelector(state => state.tareas.tasks);
    const actividad = useSelector(state => state.actividades.activity);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(tarea === '' || start_date === '' || end_date === '' || location.trim() === '' || start_time === '' || people === 0 || hours === 0){
            setError(true);
            setMessage('Todos los campos son necesarios');
            return;
        }
        setError(false);
        if(start_date.valueOf() > end_date.valueOf()){
            setError(true);
            setMessage('La fecha de inicio debe ser menor a la fecha de fin');
            return;
        }
        setError(false);
        const form = {
            tarea:tarea,
            start_date:start_date,
            end_date:end_date,
            location:location,
            start_time:start_time,
            people:people,
            hours:hours
        }
        dispatch(saveForm(form))
        history.push('/bidders/task/'+tarea);
    }

    if(Object.keys(actividad).length < 0 ) return null;

    return (
        <Fragment>
            <BackButton title="Tareas"/>
            <div
                className={`block-content block-content-full bg-white mt-50 ${error ? 'mb-100' : 'mb-50'}`}
            >        
                <button className="btn btn-sm btn-primary btn-block text-uppercase mb-4 py-2">{actividad.name}</button>
                <div className="form-group ">
                    {
                        tareas.map((tarea,index) => (
                            <div key={tarea.id} className="custom-control custom-radio">
                                <input type="radio" onChange={e => setTarea(e.target.value)} value={tarea.id} className="custom-control-input" id={"customControlValidation"+index} name="radio-stacked" />
                                <label className="custom-control-label" htmlFor={"customControlValidation"+index}>
                                    {tarea.name.charAt(0).toUpperCase().concat(tarea.name.substring(1,tarea.name.length))}
                                </label>
                            </div>
                        ))
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="location">Ubicación *</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} type="text" name="location" id="location" className="form-control form-control-sm" placeholder="Ingresar Ubicación *" />
                </div>
                <div className="form-group">
                    <label htmlFor="start_date">Fecha Inicial *</label>
                    <DatePicker
                        selected={start_date}
                        value={start_date}
                        minDate={new Date()}
                        className="form-control form-control-sm"
                        placeholderText="Selecciona una fecha"
                        dateFormat="dd-MM-yyyy"
                        name="start_date"
                        onChange={start_date => setStartDate(start_date)}
                        withPortal
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end_date">Fecha Final *</label>
                    <DatePicker
                        selected={end_date}
                        value={end_date}
                        minDate={new Date()}
                        className="form-control form-control-sm"
                        placeholderText="Selecciona una fecha"
                        dateFormat="dd-MM-yyyy"
                        onChange={end_date => setEndDate(end_date)}
                        withPortal
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="start_time">Hora Inicial *</label>
                    <DatePicker
                        selected={start_time}
                        value={start_time}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Seleccione una hora"
                        className="form-control form-control-sm"
                        onChange={start_time => setStartTime(start_time)}

                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="people">Cantidad de Personas *</label>
                    <input onChange={e => setPeople(e.target.value)} value={people} type="number" name="people" id="people" className="form-control form-control-sm" placeholder="Cantidad de Personas *"/>
                </div>
                <div className="form-group">
                    <label htmlFor="hours">Número de Horas *</label>
                    <input onChange={e => setHours(e.target.value)} value={hours} type="number" name="hours" id="hours" className="form-control form-control-sm" placeholder="N° de horas *" />
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
                        <span className="text-center" style={{cursor:"pointer"}} onClick={handleSubmit}>
                            Siguiente <i className="fas fa-arrow-right"></i>
                        </span>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}
const matchStateToProps = (state) => ({
  form:state.form.form  
})

export default connect(
    matchStateToProps,
    {}
)(Tareas)
