import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { withAuThRedirect } from '../../HOC/AuthRedirect';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/dialogs-reducer.ts';

 export const Dialogs = () => {
     
     const dialogsPage = useSelector(state => state.dialogsPage);
    //  const isAuth = useSelector(state => state.authReducer.isAuth);    // refactoiring with AuTh Redirect logic
 
     const dispatch = useDispatch();

    const sendMessage = () => {
        dispatch(actions.addMessageActionCreator());
    }

     const onMessageChanged = (e) => {
         let text = e.target.value;
         dispatch(actions.updateNewMessageTextActionCreator(text));
     }

    let dialogsElements = dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />);
    let messagesElements = dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/> );

    let newTextBody = dialogsPage.newMessageText;

 
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


// let AuthRedirectComponent = withAuThRedirect(Dialogs)   // refactoiring HOC,  because useSelector without props 

export default Dialogs;