import profileReducer,  {actions, InitialStateType, PhotosType, PostType, UserInfoType } from "./profile-reducer";
 

let state: InitialStateType;
beforeEach(
    () => {
        state = {
            posts: [
                { id: 1, message: 'Hello, world! it is my 1st post', likeCounter: 15 },
                { id: 2, message: 'How are you?', likeCounter: 23 },
                { id: 3, message: 'It kamasutra', likeCounter: 11 },
                { id: 4, message: 'Yo', likeCounter: 12 }
            ] as Array<PostType>,

            newPostText: '',

            userInfo: {
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
        }
    }
)


it('new post should be added', ()=>{
    let action = actions.addPost();
    state.newPostText='hfdshjsd'
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5);
    expect(newState.posts.length).toBe( state.posts.length+1);
    }
);

it('new post cleared textfield', ()=>{
    let action = actions.addPost();
    state.newPostText = 'hfdshjsd'
    let newState = profileReducer(state, action);
    expect(newState.newPostText).toBe('');
    }
);

it('new post not added if empty string', ()=>{
    let action = actions.addPost();
    state.newPostText = '';
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
    expect(newState.posts.length).toBe(state.posts.length);
    }
);









it('editing text in textfield of newPostText', ()=>{
    let action = actions.updateNewText('12345');
    let newState = profileReducer(state, action);
    expect(newState.newPostText).toBe('12345');
    }
);


 //доработать логику в редьюсере и вернуться

// it('toggleLikePost success', ()=>{
//     let action = actions.toggleLikePost(    );  //isLiked: boolean, postId: number
//     let newState = profileReducer(state, action);
//     expect(   ).toBe(   );
//     }
// );   

it('set User info success', () => {
    let action = actions.setUser(
        {
            aboutMe: 'aboutMe',
            contacts: {
                facebook: null ,
                website: null ,
                vk: null ,
                twitter: null ,
                instagram: null ,
                youtube: null ,
                github: null ,
                mainLink: null ,
            },
            lookingForAJob: false ,
            lookingForAJobDescription: null ,
            fullName: null ,
            userId: null ,
            photos: {
                small: null,
                large: null,
            }  
        } );
    let newState = profileReducer(state, action);
    expect(newState.userInfo.aboutMe).toBe('aboutMe');
    }
);

it('set user Status success', () => {
    let action = actions.setStatus('my new status');
    let newState = profileReducer(state, action);
    expect(newState.status).toBe('my new status');
    }
);

it('set user Status if null', () => {
    let action = actions.setStatus(null);
    let newState = profileReducer(state, action);
    expect(newState.status).toBe('');
    }
);

it('set user Status if empty string', () => {
    let action = actions.setStatus('');
    let newState = profileReducer(state, action);
    expect(newState.status).toBe('');
    }
);




it('set  Photo success', () => {
    let action = actions.setPhoto({
        small: 'small_photo_url',
        large: 'large_photo_url'
    });
    let newState = profileReducer(state, action);
    expect(newState.userInfo.photos.small).toBe('small_photo_url')
    expect(newState.userInfo.photos.large).toBe('large_photo_url')
    }
);

 