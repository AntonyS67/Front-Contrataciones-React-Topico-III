import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default initialState => {
    initialState = JSON.parse(localStorage.getItem("state")) || initialState;
    const store = createStore(
        reducer,
        // initialState,
        compose(applyMiddleware(thunk),
            typeof window === 'object' && 
                typeof window.__REDUXDEVTOOLS_EXTENSION__ !== 'undefined' ? 
                    window.__REDUXDEVTOOLS_EXTENSION__() : f => f
        )
    );

    store.subscribe(()=>{
        const state = store.getState();
        const persist = {
            categorias:{
                categorias:state.categorias.categorias,
                categoria:state.categorias.categoria
            },
            actividades:{
                actividades:state.actividades.activities,
                activity:state.actividades.activity
            },
            tareas:{
                tasks:state.tareas.tasks,
                task:state.tareas.task
            },
            ofertantes:{
                bidders:state.ofertantes.bidders,
                bidder:state.ofertantes.bidder
            },
            form:state.form
        }
        localStorage.setItem("state",JSON.stringify(persist));
    })
    return store;
}

