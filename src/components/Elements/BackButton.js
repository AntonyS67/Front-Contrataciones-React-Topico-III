import React from "react";
import Ink from 'react-ink';
import {useHistory} from 'react-router-dom';

function BackButton({title}){
    let history = useHistory();
    return (
        <React.Fragment>
            <div className="col-12 p-0 fixed-top" style={{zIndex:9}}>
                <div className="block m-0">
                    <div className="block-content p-0">
                        <div className="input-group search-box">
                            <div className="input-group-prepend">
                                <button
                                    type="button"
                                    className="btn search-navs-btns"
                                    style={{position:"relative"}}
                                    onClick={() => {
                                        setTimeout(() => {
                                            history.goBack();
                                        }, 200);
                                    }}
                                >
                                    <i className="fas fa-chevron-left"></i>
                                    <Ink duration="500" />
                                </button>
                            </div>
                            <p className="form-control search-input">
                                <span className="nav-page-title">
                                    {title}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BackButton;
