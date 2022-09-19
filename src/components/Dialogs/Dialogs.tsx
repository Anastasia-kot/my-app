import React, { useEffect } from 'react';
// @ts-ignore
import styles from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message.tsx';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { actions } from '../../redux/dialogs-reducer.ts';
// @ts-ignore
import { getIsAuth } from '../../redux/auth-selectors.ts';
// @ts-ignore
import { getDialogsState, getMessagesState, getNewMessageText } from '../../redux/dialogs-selectors.ts';
// @ts-ignore
import { getDialogs, getMessages, sendMessage, startDialog, DialogType, MessageType } from '../../redux/dialogs-reducer.ts';
  
const Dialogs = React.memo(() => {
     
    const isAuth = useSelector(getIsAuth)
    const dialogs: Array<DialogType>  = useSelector(getDialogsState)
    const messages: Array<MessageType> = useSelector(getMessagesState)
    const newMessageText: string = useSelector(getNewMessageText);
         
    const URLuserId = useParams().id;
 
    const dispatch = useDispatch();
    

    useEffect( () => {
        dispatch(getDialogs())
        console.log('dialogs:', dialogs)
        if (URLuserId) {dispatch(getMessages(URLuserId)) }
    }, [])

    useEffect( () => {
        if (URLuserId) {
            dispatch(startDialog(URLuserId))
            dispatch(getMessages(URLuserId)) 
        }
    }, [URLuserId])



    const sendMessageOnClick = () => {
        dispatch(sendMessage(URLuserId, newMessageText))
    }

    const onMessageChanged = (e) => {
         let text = e.target.value;
         dispatch(actions.updateMessageText(text));
    }


    

    let dialogsElements = dialogs.map(dialog => <DialogItem  key={dialog.id} dialog={dialog}/>);
    let messagesElements =  messages.map(m => <Message message={m} key={m.id}/> );
 

    if (!isAuth) { return <Navigate to='/login'/> }
    return (
        <div className={styles.dialogsContent}>
            <div>
                {dialogsElements}
            </div>
            {URLuserId && <div>
                {messagesElements}

                <textarea onChange={(e) => onMessageChanged(e)} value={newMessageText}/>
                <div className={styles.button}>
                    <button onClick={()=>sendMessageOnClick() }> Send message </button>
                </div>
            </div>}

        </div>
    )
})


export default Dialogs;