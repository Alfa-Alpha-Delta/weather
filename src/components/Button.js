import React from "react";
import addNotification from "react-push-notification";

const ButtonP = () =>{
    const notificacion =() =>{
        addNotification({
            title: 'QUE ME VE RAMIREZ',
            message: 'YA TIENES VIRUS ',
            duration: 4000,
            native: true,
        });
    }
    return(
        <div className="col-12">
            <button onClick={notificacion} type="button" className="btn btn-primary">Notificacion</button>
        </div>
    );
};

export default ButtonP;