import React from 'react';
import { connect } from 'react-redux';
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';


// const DialogsContainer = () => {

//     return ( <StoreContext.Consumer>{(store) => {


//         let state = store.getState();


//         let sendMessage = () => {
//             store.dispatch(addMessageActionCreator());
//         };

//         let onMessageChanged = (text) => {
//             store.dispatch(updateNewMessageTextActionCreator(text));
//         };      return (

//         <Dialogs
//             dialogs={state.dialogsPage.dialogs}
//             newMessageText={state.dialogsPage.newMessageText}
//             messages={state.dialogsPage.messages}
//             sendMessage={sendMessage}
//             onMessageChanged={onMessageChanged}
//         />
//                 )
//             }}</StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(addMessageActionCreator());
        },

        onMessageChanged: (text) => {
            dispatch(updateNewMessageTextActionCreator(text));
        }
    }
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);


export default DialogsContainer;