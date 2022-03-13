import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DialogItem.module.css' ;

const DialogItem = (props) => {
    return (
        <div>
        <NavLink to={`/dialogs/${props.id}`} className={styles.dialogItem}>
            {props.name}
        </NavLink>
        </div>
    )
}

export default DialogItem;