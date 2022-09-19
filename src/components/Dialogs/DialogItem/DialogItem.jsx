import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DialogItem.module.css' ;
import { UserOutlined } from '@ant-design/icons';


export const DialogItem = ({dialog}) => {
    return (
        <div>
            <NavLink to={`/dialogs/${dialog.id}`} className={styles.dialogItem} >
                    {dialog?.photos?.small
                        ? <img alt='avatar' src={dialog.photos.small} className={styles.avatar} />
                        : <UserOutlined className={styles.avatar} />
                    }
                {dialog.userName}
                {dialog.hasNewMessages && <sup>📩</sup>}
             </NavLink>
        </div>
    )
}

 