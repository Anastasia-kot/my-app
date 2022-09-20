import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DialogItem.module.css' ;
import { Avatar } from '../../common/Avatar/Avatar.tsx';


export const DialogItem = ({dialog}) => {
    return (
        <div>
            <NavLink to={`/dialogs/${dialog.id}`} className={styles.dialogItem} >
                <Avatar width={30} photos={dialog.photos}/> 
                {dialog.userName}
                {dialog.hasNewMessages && <sup>📩</sup>}
             </NavLink>
        </div>
    )
}

 