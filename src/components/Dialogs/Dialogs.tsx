import React, { useEffect } from 'react';
// @ts-ignore
import styles from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
// @ts-ignore
import {Message} from './Message/Message.tsx';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { actions } from '../../redux/dialogs-reducer.ts';
// @ts-ignore
import { getIsAuth, getAuthData } from '../../redux/auth-selectors.ts';
// @ts-ignore
import { getDialogsState, getMessagesState, getNewMessageText } from '../../redux/dialogs-selectors.ts';
// @ts-ignore
import { getDialogs, getMessages, sendMessage, startDialog, DialogType, MessageType } from '../../redux/dialogs-reducer.ts';
   
export const Dialogs = React.memo(() => {
     
    const isAuth = useSelector(getIsAuth)
    const myAuthData = useSelector(getAuthData)

    const dialogs: Array<DialogType>  = useSelector(getDialogsState)
    const messages: Array<MessageType> = useSelector(getMessagesState)
    const newMessageText: string = useSelector(getNewMessageText);
         
    const URLuserId = useParams().id;
 
    const dispatch = useDispatch();
    

 

    useEffect( () => {
        if (URLuserId) {
            dispatch(startDialog(URLuserId))
            dispatch(getMessages(URLuserId)) 
        }
        dispatch(getDialogs())

    }, [URLuserId, dispatch])



    const sendMessageOnClick = () => {
        dispatch(sendMessage(URLuserId, newMessageText))
    }

    const onMessageChanged = (e) => {
         let text = e.target.value;
         dispatch(actions.updateMessageText(text));
    }


 

    let dialogsElements = dialogs.map(dialog => <DialogItem  key={dialog.id} dialog={dialog}/>);
    let messagesElements = messages.map(m => <Message message={m} key={m.id} myAuthData={myAuthData}/> );
 

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


 