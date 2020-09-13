import React from 'react'
import {Link} from 'react-router-dom';
function Categoria({category}) {
    const {id,name,image} = category;
    return (
        <div className="col-6 mb-2">
            <div className="card" style={{width:"8rem",borderRadius:"10px"}}>
                <img src={"http://localhost/api-contrataciones"+image} className="card-img-top" alt={name} />
                <div className="card-body">
                    <Link to={"/activities/category/"+id} className="card-title" style={{fontSize:"1rem"}}>{name}</Link>
                </div>
            </div>
        </div>
    )
}

export default Categoria
