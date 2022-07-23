import React from 'react';
import { useState, useEffect } from 'react'; 



const ProfileStatusWithHooks = React.memo((props) => {
    useEffect( () =>{
        setStatus(props.status)
    },
        [props.status]
    );
    
    
    
    
    let [editMode, setEditMode] = useState(false);

    let activateEditMode = () => { 
        setEditMode(true)
    }
    let deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }


    let [status, setStatus] = useState(props.status);
        return (
            <div>
                {
                    editMode
                        ? <input
                            onBlur={deActivateEditMode}
                            onChange={(e)=>setStatus(e.currentTarget.value)}
                        >
                            
                        </input>
                        : <span
                            onDoubleClick={activateEditMode}
                        > 
                            {status
                                ? status
                                :'no status'
                            }
                        </span>
                }
                     
             
                
            </div>);
})


export default ProfileStatusWithHooks;