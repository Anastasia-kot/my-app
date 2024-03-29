import { InferActionsTypes } from './redux-store';
import { Dispatch } from "react";
// @ts-ignore
import { profileAPI,  ResponseStatusEnum } from "../API/api.ts";
  


let initialState =  {
    posts: [
        { id: 1, message: 'Hello, world! it is my 1st post', likeCounter: 15 },
        { id: 2, message: 'How are you?', likeCounter: 23 },
        { id: 3, message: 'It kamasutra', likeCounter: 11 },
        { id: 4, message: 'Yo', likeCounter: 12 }
    ] as Array<PostType>,
    
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
            } as PhotosType
    } as UserInfoType,
       
    status: null as string | null, 
};



const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
     switch (action.type) {

        case  'PROFILE-REDUCER/ADD_POST':  
             if (state.newPostText.length>0) {
                 return ({
                     ...state,
                     posts: [
                         ...state.posts,
                         { id: (state.posts.length + 1), message: state.newPostText, likeCounter: 0 }
                     ],
                     newPostText: ''
                 }); 
             } else {
                 return state;
             }
                
        case  'PROFILE-REDUCER/TOGGLE_LIKE_POST':  
            return {
                ...state,
                posts: 
                    state.posts.map((post) => { 
                        if (post.id === action.postId) {
                            return { ...post, likeCounter: action.isLiked ? ++post.likeCounter : --post.likeCounter }
                        } else {
                            return post
                        }    
                    }) 
            };

        case 'PROFILE-REDUCER/UPDATE_NEW_TEXT':
            return { ...state, newPostText: action.text}

        case 'PROFILE-REDUCER/SET_USER':
            return { ...state, userInfo: action.userData}

         case 'PROFILE-REDUCER/SET_PHOTO':
            return { 
                ...state,  
                userInfo: {
                    ...state.userInfo, 
                    photos: action.photos
                }
            }

        case 'PROFILE-REDUCER/SET_STATUS':
                if (!action.status) {return { ...state, status: '' }
            } else {
                return { ...state, status: action.status }
            }

        default: 
            return state;
    }
}




type ActionsTypes = InferActionsTypes<typeof actions> 


export const actions = {
    addPost: () => ({  type: 'PROFILE-REDUCER/ADD_POST' } as const),
    updateNewText: (text: string) => ({ type: 'PROFILE-REDUCER/UPDATE_NEW_TEXT', text } as const),
    toggleLikePost: (isLiked: boolean, postId: number) => ({ type: 'PROFILE-REDUCER/TOGGLE_LIKE_POST', isLiked, postId } as const),
    setUser: (userData: UserInfoType) => ({ type: 'PROFILE-REDUCER/SET_USER', userData } as const),
    setStatus: (status: string | null) => ({ type: 'PROFILE-REDUCER/SET_STATUS', status } as const),
    setPhoto: (photos: PhotosType) => ({ type: 'PROFILE-REDUCER/SET_PHOTO', photos } as const),
}



export const getUserData = (userId: number) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        try {
            let response = await profileAPI.getUserDataWithAPI(userId)
             if (response.status === ResponseStatusEnum.success) {
                dispatch(actions.setUser(response?.data))
            }
        } catch(error) {
            // alert ('some error. Try again later')             
        }
    }
}

export const updateProfilePhoto = (file: any) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        
        try {
            let response = await profileAPI.updateProfilePhotoWithAPI(file)
            if (response.status === ResponseStatusEnum.success) {
                dispatch(actions.setPhoto(response?.data.data.photos))
            }
        } catch(error) {
            // alert ('some error. Try again later') 
        }
    }
}


export const getStatus = (userId: number) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        try {
            let response = await profileAPI.getStatusWithAPI(userId)
            if (response.status === ResponseStatusEnum.success) {
                dispatch(actions.setStatus(response?.data))
            }
        } catch (error) {
            // alert('some error. Try again later')
        }    
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        try {
            let response = await profileAPI.updateStatusWithAPI(status)
            if (response.status === ResponseStatusEnum.success) { 
                    dispatch(actions.setStatus(status))
            }
        } catch (error) {
            // alert('some error. Try again later')
        }
    }
}   

  


export default profileReducer;










export type InitialStateType = typeof initialState;

export type PostType = {
    id: number,
    message: string,
    likeCounter: number
}
export type UserInfoType = {
    aboutMe: string | null,
    contacts: {
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        github: string | null,
        mainLink: string | null,
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    userId: number | null,
    photos: PhotosType
}

export type PhotosType = {
    small: string | null,
    large: string | null,
}