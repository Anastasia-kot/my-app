import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    // headers: { 'API-KEY': '4ad644c4-d1dd-49be-b3f0-9812e1d31045' }
    headers: { 'API-KEY': '0cf648d6-246e-4fc6-a36e-70e44f9caa52' }
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
    getUsersWithAPI: async (count: number, currentPage: number) => {
    const response = await instance
            .get<ResponseType>(`users?count=${count}&page=${currentPage}`);
        return response.data;
},
    followUserWithAPI: async (userId: number) => {
    const response = await instance
            .post(`follow/${userId}`);
        return response.data;
},
    unfollowUserWithAPI: async (userId: number) => {
    const response = await instance
            .delete(`follow/${userId}`);
        return response.data;
}
}

export const profileAPI ={ 
    getUserDataWithAPI: async (userId: number) => {
        const response = await instance
            .get<ResponseType>(`profile/${userId}`);
        return response;
    },

    updateStatusWithAPI: async (status: string) => {
        const response = await instance
            .put<ResponseType>(`profile/status/`, { status: status });
        return response;
    },

    getStatusWithAPI: async (userId: number) => {

        const response = await instance
            .get<ResponseType>(`profile/status/${userId}`);
        return response;
    },

    updateProfilePhotoWithAPI: async (file) => {
        const formData = new FormData();
        formData.append('image', file)

        const response = await instance
            .put<ResponseType>(`profile/photo`,
                formData,
                {
                    headers: {
                        'Content-Type': "multipart / form - data"
                    }
                }
            );
        return response;
    },
}

export const authAPI = {
    getAuthUserDataWithAPI: async () => {
        const response = await instance
            .get<ResponseType>(`auth/me`);
        return response.data;
    },

    loginWithAPI: async (email: string, password:string, rememberMe:boolean) => {
        const response = await instance
            .post<ResponseType>(`/auth/login`, { email: email, password: password, rememberMe: rememberMe });
        return response.data.data;
    },

    logOutWithAPI: async () => {
        const response = await instance
            .delete(`/auth/login`);
        return response.data.data;
    },

    loginCaptchaWithAPI: async () => {
        const response = await instance
            .get(`security/get-captcha-url`);
        return response.data;
        // properties:
        // url: url to display captcha - image
    }

 
}

export const dialogsAPI = {
    startDialogWithAPI: async (id: number) => {
        const response = await instance
            .put<ResponseType>(`dialogs/${id}`);
        return response.data;
    },

    getDialogsWithAPI: async () => {
        const response = await instance
            .get<ResponseType>(`dialogs`);
        return response.data;
    },

    getMessagesListWithAPI: async (id: number, page: number = 1, count: number = 10) => {
        const response = await instance
            .get<ResponseType>(`dialogs/${id}/messages?page=${page}&count=${count}`);
        return response.data;
    },
    sendMessageWithAPI: async (id: number, message: string) => {
        const response = await instance
            .post<ResponseType>(`dialogs/${id}/messages`, { body: message });
        return response.data;
    },








    isMessageViewedWithAPI: async (messageId: number) => {
        const response = await instance
            .get<ResponseType>(`dialogs/messages/${messageId}/viewed`);
        return response.data;
    },

    replaceMessageToSpamWithAPI: async (messageId: number) => {
        const response = await instance
            .post<ResponseType>(`dialogs/messages/${messageId}/spam`);
        return response.data;
    },

    deleteMessageToMeOnlyWithAPI: async (messageId: number) => {
        const response = await instance
            .delete<ResponseType>(`dialogs/messages/${messageId}`);
        return response.data;
    },

    restoreMessageFromDeleteAndSpamWithAPI: async (messageId: number) => {
        const response = await instance
            .put<ResponseType>(`dialogs/messages/${messageId}/restore`);
        return response.data;
    },

    getMessagesNewestWithAPI: async (userId: number, date: string) => { 
        // date - (string) - desired date(string in date format)
        const response = await instance           
            .get<ResponseType>(`dialogs/${userId}/messages/new?newerThen=${date}`);
        return response.data;
    },

    getNewMessagesListWithAPI: async () => { 
        const response = await instance           
            .get<ResponseType>(`dialogs/messages/new/count`);
        return response.data;
    },
}
