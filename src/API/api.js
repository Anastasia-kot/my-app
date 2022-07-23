import axios from 'axios';

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

export const updateStatusWithAPI = (status) => {
    return instance
        .put(`profile/status/`, { status: status })
        .then(response => {
            return response.data.data
        })
}

export const getStatusWithAPI = (userId) => {
    
    return instance
        .get(`profile/status/${userId}`)
        .then(response => {
            
            
            return response.data 
        })
}

export const updateProfilePhotoWithAPI = (  file ) => {
    const formData = new FormData();
    formData.append('image', file)
    
    return instance
        .put(`profile/photo`, 
            formData, 
            {headers: {
                'Content-Type': "multipart / form - data"}}
            )
        .then(response => { 
            return response.data.data.photos 
        })
}




export const getAuthUserDataWithAPI = () => {
    return instance
        .get(`auth/me`)
        .then(response => { return response.data })
}

export const loginWithAPI = (email, password, rememberMe) => {
    return instance
        .post(`/auth/login`, { email: email, password: password, rememberMe: rememberMe })
        .then(response => { 
            return response.data.data 
        })
}

export const logOutWithAPI = (email, password, rememberMe) => {
    return instance
        .delete(`/auth/login` )
        .then(response => { 
            return response.data.data 
        })
}



