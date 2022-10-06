import { Dispatch } from 'react';
 // @ts-ignore
import { dialogsAPI, ResultCodeEnum } from '../API/api.ts';
import { InferActionsTypes } from './redux-store';
 


let initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>,
    newMessageText: '' as string,

}


const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_MESSAGE':
       
            return {
                ...state,
                newMessageText: ''
            };
          
        case 'UPDATE_MESSAGE_TEXT':
            return {
                ...state,
                newMessageText: action.text
            };

        case 'SET_DIALOGS':
            return {
                ...state,
                dialogs: action.dialogs
            };
    
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.messages
            };
    

        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addMessage: () => ({ type: 'ADD_MESSAGE' } as const),
    updateMessageText: (text: string) => ({ type: 'UPDATE_MESSAGE_TEXT', text } as const),
    
    setDialogs: (dialogs: Array<DialogType>) => ({ type: 'SET_DIALOGS', dialogs } as const),
    setMessages: (messages: Array<MessageType>) => ({ type: 'SET_MESSAGES', messages } as const),

}





export const startDialog = (id: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        // const resp = await dialogsAPI.startDialogWithAPI(id)
        await dialogsAPI.startDialogWithAPI(id)
        getDialogs()
    } catch (err) {
        console.error('please try later')
    }
}

export const getDialogs = () => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const dialogs = await dialogsAPI.getDialogsWithAPI()
        dispatch(actions.setDialogs(dialogs))
    } catch (err) {
        console.error('please try later')
    }
}
export const getMessages = (id: number, page: number = 1, count: number = 10) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const messages = await dialogsAPI.getMessagesListWithAPI(id, page, count)
        dispatch(actions.setMessages(messages.items))
             // error: null
            // items: []
            // totalCount : 0
    } catch (err) {
        console.error('please try later')
    }
}

export const sendMessage = (id: number, message: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await dialogsAPI.sendMessageWithAPI(id, message)
         if (response.resultCode === ResultCodeEnum.success) {
            dispatch(actions.addMessage())
            getMessages(id)
        }
                  
    } catch (err) {
        console.error('please try later')
    }
}




export default dialogsReducer;




export type InitialStateType = typeof initialState;

export type DialogType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string    //ISO DATE
    lastUserActivityDate: string    //ISO DATE
    newMessagesCount: number
    photos: { 
        small: null | string,    // URL string
        large: null | string     // URL string
    }
    userName: string
}

export type MessageType = {
    id: string   // message id
    body: string,
    addedAt: string    //ISO DATE  like  "2022-09-19T15:50:39.213",
    senderId: number,
    senderName: string,
    recipientId: number,
    viewed: boolean
}
