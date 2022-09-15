import { StatusSocketType } from './../redux/chat-reducer';
const subscribers = {
    'messages-received' :  [],
    'status-changed' : [] 
}
type EventsNamesType = 'messages-received' |  'status-changed'  



let ws: WebSocket | null = null;


const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
}
const messageHandler = (e) => {
    const newMessages =  JSON.parse(e.data);
    subscribers['messages-received'].forEach(s=>s(newMessages))
}
const cleanUP = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
    ws?.removeEventListener('message', messageHandler);
} 


const notifySubscribersAboutStatus = (status:StatusSocketType) => {
    subscribers['status-changed'].forEach(s=>s(status))
}


function createChannel() {

    cleanUP()                    
    ws?.close() 

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending')

    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
}
 

export const chatAPI = {
    start() {
        createChannel();
    },

    stop() {
        subscribers['messages-received'] = [];
        subscribers['status-changed'] = [];

        ws?.removeEventListener('close', closeHandler);    //cleanUP()

        ws?.close(); 
    },

    subscribe(eventName:EventsNamesType, callback  ) {
        subscribers[eventName].push(callback)
        return () => {
            subscribers[eventName] = subscribers[eventName].filter(s => s!==callback)
        }
    }, 

    unsubscribe(eventName: EventsNamesType, callback) {
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    sendMessage(message: string) {
        ws?.send(message)
    }, 

}

 