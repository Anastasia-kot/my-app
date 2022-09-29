import React from 'react';
import { MessageType } from '../../../redux/dialogs-reducer';
// @ts-ignore
import styles from './Message.module.css';
// @ts-ignore
import { dateConverter } from '../../../utils/dateConverters.ts';
import cn  from 'classnames';
import { AuthUserDataType } from '../../../redux/auth-reducer';
import { NavLink } from 'react-router-dom';

type Props = {
    message: MessageType,
    myAuthData: AuthUserDataType
}
 
export const Message: React.FC<Props> = ({ message, myAuthData }) => {
     
    return (
        <div className={cn(styles.message, { [styles.myMessage]: myAuthData.id === message.senderId }, { [styles.notViewed]: !message.viewed },  ) } > 
            <NavLink to={'/profile/' + message.senderId} className={styles.userName}>
                    {message.senderName + ': '}
            </NavLink>
            
           
            <span> {message.body} </span>
            <span className={styles.date} >{dateConverter(message.addedAt)} </span>
        </div>

    )
}

