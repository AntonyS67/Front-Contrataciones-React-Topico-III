import React from 'react'

function Error({message}) {
    return (
        <div
            className="auth-error"
            style={{
                backgroundColor: "#282c3f",
                color: "#f4f4f5",
                zIndex:"21476",
                marginBottom:"3rem"
            }}>
            <div className="error-shake">
                {message}
            </div>
        </div>
    )
}

export default Error
