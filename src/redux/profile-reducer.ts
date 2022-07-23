import { Dispatch } from "react";
import { getUserDataWithAPI,  getStatusWithAPI, updateStatusWithAPI, updateProfilePhotoWithAPI } from "../API/api";

const ADD_POST = 'PROFILE-REDUCER/ADD_POST';
const UPDATE_NEW_TEXT = 'PROFILE-REDUCER/UPDATE_NEW_TEXT';
const SET_USER = 'PROFILE-REDUCER/SET_USER';
const SET_STATUS = 'PROFILE-REDUCER/SET_STATUS';
const SET_PHOTO = 'PROFILE-REDUCER/SET_PHOTO';

type InitialStateType = typeof initialState;

type Post = { 
    id: number, 
    message: string, 
    likeCounter: number 
}
type UserInfoType = {
        aboutMe:  string | null,
        contacts: {
            facebook:  string | null,
            website:  string | null,
            vk:  string | null,
            twitter: string | null,
            instagram:  string | null,
            youtube: string | null,
            github:  string | null,
            mainLink:  string | null,
        },
        lookingForAJob:  boolean,
        lookingForAJobDescription:  string | null,
        fullName:  string | null,
        userId:  number | null,
            photos:  Photos
}

type Photos = {
    small: string | null,
    large: string | null,
}

let initialState =  {
    posts: [
        { id: 1, message: 'Hello, world! it is my 1st post', likeCounter: 15 },
        { id: 2, message: 'How are you?', likeCounter: 23 },
        { id: 3, message: 'It kamasutra', likeCounter: 11 },
        { id: 4, message: 'Yo', likeCounter: 12 }
    ] as Array<Post>,
    
    newPostText: '',
    
    userInfo:   {
            
            aboutMe: null as string | null,
            contacts: {
                facebook: null as string | null,
                website: null as string | null,
                vk: null as string | null,
                twitter: null as string | null,
                instagram: null as string | null,
                youtube: null as string | null,
                github: null as string | null,
                mainLink: null as string | null,
            },
            lookingForAJob: false as boolean,
            lookingForAJobDescription: null as string | null,
            fullName: null as string | null,
            userId: null as number | null,
            photos: {
                small: null,
                large: null,
            } as Photos
    } as UserInfoType,
       
    status: null as string | null, 
};



const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
     switch (action.type) {

        case  ADD_POST:  
            let postMessage = state.newPostText;
            return {
                ...state,
                posts: [
                    ...state.posts, 
                    { id: (state.posts.length + 1), message: postMessage, likeCounter: 0} 
                ],
                newPostText:''
            };

        case UPDATE_NEW_TEXT:
            return { ...state, newPostText: action.text}

        case SET_USER:
            return { ...state, userInfo: action.userData}

         case SET_PHOTO:
            return { 
                ...state,  
                userInfo: {
                    ...state.userInfo, 
                    photos: action.photos
                }
            }

        case SET_STATUS:
                if (!action.status) {return { ...state, status: '' }
            } else {
                return { ...state, status: action.status }
            }

        default: 
            return state;
    }
}




type ActionsTypes = AddPostAT | UpdateNewTextAT | SetUserAT | SetStatusAT | setPhotoAT;

type AddPostAT = { 
    type: typeof  ADD_POST 
}
export let addPost = (): AddPostAT => ({ type: ADD_POST });

type UpdateNewTextAT = { 
    type: typeof UPDATE_NEW_TEXT,
    text: string
}
export let updateNewText = (text: string): UpdateNewTextAT => ({ type: UPDATE_NEW_TEXT,  text });

type SetUserAT = {
    type: typeof SET_USER,
    userData: UserInfoType
}
export let setUser = (userData: UserInfoType): SetUserAT => ({ type: SET_USER, userData });

type SetStatusAT = {
    type: typeof SET_STATUS,
    status: string
}
export let setStatus = (status: string): SetStatusAT => ({ type: SET_STATUS, status });

type setPhotoAT = {
    type: typeof SET_PHOTO,
    photos: Photos
}
export let setPhoto = (photos: Photos): setPhotoAT => ({ type: SET_PHOTO, photos });

 

export const getUserData = (userId: number) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await getUserDataWithAPI(userId)
        dispatch(setUser(response))
    }
}

export const updateProfilePhoto = (file: any) => (dispatch: Dispatch<ActionsTypes>) => {
    updateProfilePhotoWithAPI(file)
        .then(response => {
            dispatch(setPhoto(response))
        })
}


export const getStatus = (userId: number) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await getStatusWithAPI(userId)
        dispatch(setStatus(response))
    }    
}

export const updateStatus = (status: string) => (dispatch: Dispatch<ActionsTypes>) => {
    updateStatusWithAPI(status)
        .then(response => {
            dispatch(setStatus(status))
        })
}


  


export default profileReducer;