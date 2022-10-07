import { RootState } from "./redux-store"

export const getDialogsState = (state: RootState) => {
    return state.dialogsPage.dialogs
}
export const getMessagesState = (state: RootState) => {
    return state.dialogsPage.messages
}
export const getNewMessageText = (state: RootState) => {
    return state.dialogsPage.newMessageText
}
 