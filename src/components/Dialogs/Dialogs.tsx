import React, { useEffect } from 'react';
import styles from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/dialogs-reducer.ts';
import { dialogsAPI } from '../../API/api';
import { getDialogs, Dialog } from '../../redux/dialogs-reducer.ts';

const Dialogs = () => {
     
    const dialogsPage = useSelector(state => state.dialogsPage);
    const isAuth = useSelector(state => state.authReducer.isAuth);
    const dialogs: Array<Dialog>  = useSelector(state => state.dialogsPage.dialogs);
         
 
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getDialogs())
    }, [])

    const sendMessage = () => {
        dispatch(actions.addMessageActionCreator());
    }

    const onMessageChanged = (e) => {
         let text = e.target.value;
         dispatch(actions.updateNewMessageTextActionCreator(text));
    }


    

    let dialogsElements = dialogs.map(dialog => <DialogItem  key={dialog.id} dialog={dialog}/>);
    let messagesElements = dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/> );

    let newTextBody = dialogsPage.newMessageText;

     if (!isAuth) { return <Navigate to='/login'/> }
    return (
        <div className={styles.dialogsContent}>
            <div>
                {dialogsElements}
            </div>
            <div>
                {messagesElements}

                <textarea onChange={(e) => onMessageChanged(e)} value={newTextBody}/>
                <div className={styles.button}>
                    <button onClick = {  sendMessage }> Send message </button>
                </div>
            </div>

        </div>
    )
}


export default Dialogs;