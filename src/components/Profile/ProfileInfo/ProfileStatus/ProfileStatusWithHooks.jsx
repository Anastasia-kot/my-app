import React from 'react';
import { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../../../redux/profile-reducer.ts';
import { getStatusSelector } from '../../../../redux/profile-selectors';



export const ProfileStatusWithHooks = React.memo(() => {

    let [status, setStatus] = useState(useSelector(getStatusSelector));
    const [editMode, setEditMode] = useState(false);


    const dispatch = useDispatch();
 
    useEffect( () => { 
        setStatus(status) 
    }, [status]);
    
    
    
    const activateEditMode = () => { 
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        console.log(status)
        dispatch(updateStatus(status))
    }


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


 