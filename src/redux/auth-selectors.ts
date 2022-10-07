import { RootState } from "./redux-store"

export const getIsAuth = (state: RootState) => {
    return state.authPage.isAuth
}
export const getInitializedState = (state: RootState) => {
    return state.authPage.initialized
}
export const getAuthData = (state: RootState) => {
    return state.authPage.data
}
export const getAuthLogin = (state: RootState) => {
    return state.authPage.data.login
}
export const getAuthId = (state: RootState) => {
    return state.authPage.data.id
}

 