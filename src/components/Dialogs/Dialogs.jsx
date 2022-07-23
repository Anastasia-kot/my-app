import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { withAuThRedirect } from '../../HOC/AuthRedirect';

 const Dialogs = (props) => {
     
    //  if (!props.isAuth) { return <Navigate replace to='/login' /> }


    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/> );

    

    let newTextBody = props.dialogsPage.newMessageText;

    let sendMessage = () => {
        props.sendMessage();
    };

    let onMessageChanged = (e) => {
        let text = e.target.value;
        props.onMessageChanged (text) ;
    };



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


let AuthRedirectComponent = withAuThRedirect(Dialogs)

export default AuthRedirectComponent;