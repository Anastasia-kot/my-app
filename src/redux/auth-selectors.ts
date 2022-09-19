export const getIsAuth = (state) => {
    return state.authPage.isAuth
}
export const getInitializedState = (state) => {
    return state.authPage.initialized
}
export const getAuthData = (state) => {
    return state.authPage.data
}
export const getAuthLogin = (state) => {
    return state.authPage.data.login
}
export const getAuthId = (state) => {
    return state.authPage.data.id
}

 