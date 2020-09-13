import {combineReducers} from 'redux';
import categoriaReducer from './Categorias';
import actividadesReducer from './Actividades';
import tareasReducer from './Tareas';
import ofertantesReducer from './Ofertantes';
import formReducer from './Form';

export default combineReducers({
    categorias: categoriaReducer,
    actividades: actividadesReducer,
    tareas: tareasReducer,
    ofertantes:ofertantesReducer,
    form:formReducer
})
