import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getCategorias} from '../../reducers/Categorias/action';
import Nav from '../Header/Nav';
import Categoria from './Categoria';


function Categorias() {
    const dispatch = useDispatch();

    useEffect(() => {
        const obtenerCategorias = () => dispatch(getCategorias());
        obtenerCategorias();
       
    },[dispatch]);

    const categorias = useSelector(state => state.categorias.categorias);
    return (
        <div>
            <Nav/>
            <div className="container mt-3">
                <div className="row">
                    {
                        categorias.map(category => (
                            <Categoria key={category.id} category={category}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Categorias
