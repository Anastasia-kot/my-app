import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { 'API-KEY': '4ad644c4-d1dd-49be-b3f0-9812e1d31045' }
})

type ResponseType = {
    data: {
        data: any
        fieldsErrors: Array<any>,
        messages: Array<any>,
        resultCode:  ResultCodeEnum,
    },
    status: number
    statusText: string
}


export enum ResultCodeEnum {
    success = 0,
    error = 1,
}
export enum ResponseStatusEnum {
    success = 200,
    error = 400,
}


export const usersAPI = {
    getUsersWithAPI: (count: number, currentPage: number) => {
    return instance
        .get<ResponseType>(`users?count=${count}&page=${currentPage}`)
        .then(response => { return response.data })
},
    followUserWithAPI: (userId: number) => {
    return instance
        .post(`follow/${userId}`)
        .then(response => { return response.data })
},
    unfollowUserWithAPI: (userId: number) => {
    return instance
        .delete(`follow/${userId}`)
        .then(response => { return response.data })
}
}

export const profileAPI ={ 
    getUserDataWithAPI: (userId: number) => {
        return instance
            .get<ResponseType>(`profile/${userId}`)
            .then(response => { return response})
    },

    updateStatusWithAPI: (status: string) => {
        return instance
            .put<ResponseType>(`profile/status/`, { status: status })
            .then(response => {
                return response 
            })
    },

    getStatusWithAPI: (userId: number) => {

        return instance
            .get<ResponseType>(`profile/status/${userId}`)
            .then(response => {


                return response 
            })
    },

    updateProfilePhotoWithAPI: (file) => {
        const formData = new FormData();
        formData.append('image', file)

        return instance
            .put<ResponseType>(`profile/photo`,
                formData,
                {
                    headers: {
                        'Content-Type': "multipart / form - data"
                    }
                }
            )
            .then(response => {
                return response
            })
    },
}

export const authAPI = {
    getAuthUserDataWithAPI: () => {
        return instance
            .get<ResponseType>(`auth/me`)
            .then(response => { return response.data })
    },

    loginWithAPI: (email: string, password:string, rememberMe:boolean) => {
        return instance
            .post<ResponseType>(`/auth/login`, { email: email, password: password, rememberMe: rememberMe })
            .then(response => {
                return response.data.data
            })
    },

    logOutWithAPI: () => {
        return instance
            .delete(`/auth/login`)
            .then(response => {
                return response.data.data
            })
    }
}
