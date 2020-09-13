import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Categoria from './components/Categorias';
import Actividades from './components/Actividades';
import Tareas from './components/Tareas';
import Ofertantes from './components/Ofertantes';
import Resumen from './components/Resumen';
function App({initialState={}}) {

  return (
    <Router>
      <Provider store={store(initialState)}>
          <Switch>
            <Route exact path="/summary" component={Resumen} />
            <Route exact path="/bidders/task/:taskId" component={Ofertantes}/>
            <Route exact path="/tasks/activity/:activityId" component={Tareas}/>
            <Route exact path="/activities/category/:categoryId" component={Actividades} />
            <Route exact path="/" component={Categoria}/>
          </Switch>
      </Provider>
    </Router>
    
  );
}

export default App;
