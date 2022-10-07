import { RootState } from "./redux-store"

export const getUsers = (state: RootState) => {
    return state.usersPage.users
}
export const getTotalCount = (state: RootState) => {
    return state.usersPage.totalCount
}
export const getCount = (state: RootState) => {
    return state.usersPage.count
}
export const getCurrentPage = (state: RootState) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: RootState) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: RootState) => {
    return state.usersPage.followingInProgress
}