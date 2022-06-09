import axios from 'axios';
import react from 'react';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true ,
    headers: { 'API-KEY': '4ad644c4-d1dd-49be-b3f0-9812e1d31045' } 
})



export const getUsersWithAPI = (count, currentPage) => {
    return instance
        .get(`users?count=${count}&page=${currentPage}`)
        .then(response => {return response.data})
}

export const followUserWithAPI = (userId) => {
    return instance
        .post(`follow/${userId}`)
        .then(response => { return response.data })
}

export const unfollowUserWithAPI = (userId) => {
    return instance
        .delete(`follow/${userId}`)
        .then(response => { return response.data })
}



export const getUserDataWithAPI = (userId) => {
    return instance
        .get(`profile/${userId}`)
        .then(response => { return response.data })
}



export const getAuthUserDataWithAPI = () => {
    return instance
        .get(`auth/me`)
        .then(response => { return response.data })
}

