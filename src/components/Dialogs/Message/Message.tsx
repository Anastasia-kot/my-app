import React from 'react';
import { MessageType } from '../../../redux/dialogs-reducer';
import styles from './Message.module.css';
import { dateConverter } from '../../../utils/dateConverters.ts';

type Props = {
    message: MessageType
}

export const Message: React.FC<Props> = ({ message }) => {
    console.log(message)
    return (
        <div className={styles.message}>
            <span>{message.body} </span>
            <span style={{ 'fontSize': 'smaller' }}>{dateConverter(message.addedAt)} </span>
            {!message.viewed && <sup style={{color: 'red'}}>new</sup>}
        </div>

    )
}

