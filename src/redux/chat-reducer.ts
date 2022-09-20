import { chatAPI } from '../API/chat-api.ts';
import { InferActionsTypes } from './redux-store';
 

type InitialStateType = typeof initialState;

let initialState = {
    messages: [] as Array<ChatMessageType>,
    status: null as null | StatusSocketType,
}


const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'CHAT-REDUCER/MESSAGE_RECEIVED':
            return {
                ...state,
                messages: [...state.messages,  ...action.messages]
                    .filter((message, index, array) => index >=array.length - 10 )      // last 10 messages
            };
    
        case 'CHAT-REDUCER/STATUS_CHANGED':
            return {
                ...state,
                status: action.status
            };
        
        default:
            return state;
    }
}


type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    messageReceived: (messages: Array<ChatMessageType>) => ({ type: 'CHAT-REDUCER/MESSAGE_RECEIVED', messages } as const),
    statusChanged: (status: StatusSocketType) => ({ type: 'CHAT-REDUCER/STATUS_CHANGED', status } as const),
}


let _newMessageHandler: ((messages: Array<ChatMessageType>) => void) | null  =  null; 
const newMessageHandleCreator = (dispatch) => {
    if ( _newMessageHandler === null ) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messageReceived(messages))
        }
    }
    return _newMessageHandler
}


let _statusChangedHandler: ((status: StatusSocketType) => void) | null = null;
const statusChangedHandleCreator = (dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}







export const startMessageListening = () => async (dispatch ) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessageHandleCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandleCreator(dispatch))
}

export const stopMessageListening = () => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandleCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandleCreator(dispatch))
    chatAPI.stop();
}

export const sendMessage = (message: string) => async (dispatch) => {
    chatAPI.sendMessage(message)
}









export default chatReducer;





export type StatusSocketType = 'pending' | 'ready' | 'error';

export type ChatMessageType = {
    message: string
    photo: string | null // URL string
    userId: number
    userName: string
}