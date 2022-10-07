import { RootState } from "./redux-store"

export const getPosts = (state: RootState) => {
    return state.profilePage.posts
}
export const getNewPostText = (state: RootState) => {
    return  state.profilePage.newPostText
}
 
export const getUserInfo = (state: RootState) => {
    return state.profilePage.userInfo
}
export const getStatusSelector = (state: RootState) => {
    return state.profilePage.status
}
 