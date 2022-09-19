import React, { useEffect, useState } from 'react';
import styles from './ChatPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import { sendMessage, startMessageListening, stopMessageListening } from '../../redux/chat-reducer.ts';


export const ChatPage:React.FC<{}> = () => {
 
    const dispatch = useDispatch();
    const status = useSelector(state => state.chatPage.status);
    const messages = useSelector(state => state.chatPage.messages);


    useEffect(() => {  
        dispatch(startMessageListening())
        return()=> {
            dispatch(stopMessageListening())
        }
    }, [dispatch])

    //    const [messages, setMessages] = useState<Array<any>>([])
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

                    <img src={m.photo} alt='avatar' style={{ width: '30px', 'borderRadius': '5px', 'marginRight': '10px' }}/>
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
