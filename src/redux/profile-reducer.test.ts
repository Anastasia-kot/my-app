import profileReducer,  {actions } from "./profile-reducer";
 

// let mystate = {
//     posts: [
//         { id: 1, message: 'Hello, world! it is my 1st post', likeCounter: 15 },
//         { id: 2, message: 'How are you?', likeCounter: 23 },
//         { id: 3, message: 'It kamasutra', likeCounter: 11 },
//         { id: 4, message: 'Yo', likeCounter: 12 }
//     ],

//     newPostText: '',

//     userInfo: {

//         aboutMe: null ,
//         contacts: {
//             facebook: null ,
//             website: null ,
//             vk: null ,
//             twitter: null ,
//             instagram: null ,
//             youtube: null ,
//             github: null ,
//             mainLink: null,
//         },
//         lookingForAJob: false,
//         lookingForAJobDescription: null ,
//         fullName: null ,
//         userId: null,
//         photos: {
//             small: null,
//             large: null,
//         } 
//     } ,

//     status: null ,
// };

 
it('new post should be added', ()=>{
    let action = actions.addPost();
    let state = {
        posts: [
            { id: 1, message: 'Hello, world! it is my 1st post', likeCounter: 15 },
            { id: 2, message: 'How are you?', likeCounter: 23 },
            { id: 3, message: 'It kamasutra', likeCounter: 11 },
            { id: 4, message: 'Yo', likeCounter: 12 }
        ],

        newPostText: 'it-kamasutra.com',

        userInfo: {

            aboutMe: null,
            contacts: {
                facebook: null,
                website: null,
                vk: null,
                twitter: null,
                instagram: null,
                youtube: null,
                github: null,
                mainLink: null,
            },
            lookingForAJob: false,
            lookingForAJobDescription: null,
            fullName: null,
            userId: null,
            photos: {
                small: null,
                large: null,
            }
        },

        status: null,
    };

let newState = profileReducer(state, action);

expect(newState.posts.length).toBe(5);




}



);