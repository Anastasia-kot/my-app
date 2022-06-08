import axios from 'axios';
import react from 'react';

const instance = axios.create({
    baseURL: null
})

export const getUsersWithAPI = (count, currentPage) => {
    return axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?count=${count}&page=${currentPage}`, { withCredentials: true })
        .then(response => {return response.data})
}

export const getUserDataWithAPI = (userId) => {
    return axios
        .get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`, { withCredentials: true })
        .then(response => { return response.data })
}


export const followUserWithAPI = (userId) => {
    return axios
        .post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {},
            { withCredentials: true, headers: { 'API-KEY': '4ad644c4-d1dd-49be-b3f0-9812e1d31045' } })
        .then(response => { return response.data })
}

export const unfollowUserWithAPI = (userId) => {
    return axios
        .delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {},
            { withCredentials: true, headers: { 'API-KEY': '4ad644c4-d1dd-49be-b3f0-9812e1d31045' } })
        .then(response => { return response.data })
}




export const getAuthUserDataWithAPI = () => {
    return axios
        .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true })
        .then(response => { return response.data })
}

