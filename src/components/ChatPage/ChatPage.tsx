import React, { useEffect, useState } from 'react';
// @ts-ignore
import styles from './ChatPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import { sendMessage, startMessageListening, stopMessageListening } from '../../redux/chat-reducer.ts';
// @ts-ignore
import { RootState  } from '../../redux/redux-store.ts';
// @ts-ignore
import { Avatar } from '../common/Avatar/Avatar.tsx';


export const ChatPage:React.FC<{}> = () => {
 
    const dispatch = useDispatch();
    const status = useSelector((state: RootState) => state.chatPage.status);
    const messages = useSelector((state: RootState) => state.chatPage.messages);


    useEffect(() => {  
        dispatch(startMessageListening())
        return()=> {
            dispatch(stopMessageListening())
        }
    }, [dispatch])

       const [newMessage, setNewMessage] = useState<string>('')

    const sendMessageHandler = () => {
        if (!newMessage) {
            return
        } else {
            dispatch(sendMessage(newMessage))
            setNewMessage('')
        }

    }

    return (
        <div>
            <div> messages: {messages.map(m => 
                <div key={messages.indexOf(m)} style={{ 'marginBottom': '10px' }}>
                    <NavLink to={'/profile/' + m.userId} className={styles.user}>
                        <Avatar width={30} photo={m.photo}/> 
                        <b> {m.userName}</b> <sup>id: {m.userId}</sup>
                    </NavLink>
                    {   ': ' + m.message}
                </div>)}
                                     
            </div>
            
            <textarea onChange={(e) => { setNewMessage(e.target.value) }} value={newMessage} />
            <div>
                <button onClick={sendMessageHandler} disabled={status !== 'ready'}>Send</button>
            </div>
        </div>
    )
}
