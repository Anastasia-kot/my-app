const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';


let initialState =  {
    users: [
        {name: 'Mike', age: '30', userId: 1, isFollowed: true,
            address: {country:'Russia', city: 'Krasnodar'},  
            avatar: 'https://kinopoisk-ru.clstorage.net/mL29p5415/cdaafbOipY/uC4901HoV5UffBz85L87GLVWbNT0IiRENGg28rPtu7FhzBCEzxZrqrA13-acIh0MpCEP2gtxt1bp3dvSQnYxFPp5cYMO-RzISyJW5rbkZh6vQWSCtj5sE3h1Ja_vspSBSf459ukpQ4qcVJmm2zhPUfxhGdNaYO5OqJupvAdlaHWIJAL9bNw4ljdLVNPPhAcFhSBW99FjB1AUPSj2hNOBq33sMeLoLHCIllusgepbRXD-Qwv3X0nnJ5mesJlUQU1jpAwq4VDKDbIeaF3pw5UwK7c-RuTEfw1QEh0l46fUn6ph8xTuyz1eq7h1tJLGZVZZxHwRxXxJ7Q2RgrmlS2RtWrcNJMpR9huPC2NI1sSdMRuhEFHawm8oaTUWLOGI1bmQY90YxsM4aJqiQoKD2VhPcepEAvd2Q8oaqouUtXV9Q1GCKgX7Ut4uqx1jYe_MoAU2hCJD0MxmLnItAQ3VjcumqkvmEMvhDEalh0yPkuBuXE7GWzP9SkXPK5-5sZpUTWFzrT4Dy3LUKZkiaVrn84YwP546eNTjexNZBg46_43MiZxh1zfH0j5uvaV8iZDWXlVb3l8hz3l_6Q6qooyuTl1za5o9M95N8xieOF1Yy_OJCyurIG_B5n4yWwwkKPiw66-MStY688M5YIe3Vr2WxHRVVN1bA-x5acwil4u9mUBTf0u2ARrQcNUIoQJ2WcDWiREeiw5u_c1HLWs3CDfvs_Cst2_LOfPTDWCik327uMhMZUvhQCPPVnTMGa2Av4ZdQVVVryYA-3b0NagcRFDCxoQHNK4IW8DWWzBkNCoP-a_TiYZYzRDR4zl7r79furDDQ1J100AQ8nxfyBmtvLOoRHlPSb4AHcZg9jeSDVl8yNOlCimbOmjgwX0xUAEJG_26zZ2_TtkDw9waW6yhTqep7npUQft3O8xRVtcwno-khXVlbFqBCj3ASPEQiyJ9W_3Pog8XvQ1r2NhmKU8iAhnpu-abnWXLGuziEGK-hH6fhcl0QVzqXi_Fd0vSLZGhl6hCYnVYniAR4k3NIIgtblv_17AqPKoCWvXGayxTNgwx6JvOprVyzhrYxDV_v4N5u5XZZE5i5H4d01xb5Cu5uLSJQ35RVIMnD-Bk7CqgCmFj6e2wHS-jHW3F83gISgIpGv2n7YOUcMgq0NcZZYSdb7e02X5iauZcC8R9cvIUl4i0hlF6S26WPy7EetQujx5oQuTRphw-rhtIx-hXFWYUJDH5n9ucrljYHc7MP1i4nneKq8Z3VmHVay3-YnzxC6yrobR_Rk5-qRsk61vyELAyWnXwzoAUH4E7TcvsdCRKFSsq3oTRuItN0Tna1gptv6Z_vLTIcXRP-G0D-UtQ_Ti_n6GnSUNSXL8ZCtZg4SO8LHxg4sKoHRymDGjz2moBezkSPs6a9omLS8wf588rc5qxXoCc2lxdceF5BPtHfcAWi6-nkH5mTF-8GRDUSvATkRNbSsniuDg7nBRY1PNqDGwtDCzOudeEnEDZK__MGGCFr1WYm8FhYUnrVhDTZlnOLpuEpLBUeG93hxsv2lnvELk2enfA9pMoHqQ7bObPZzFSFwY89afgo5J8yx_m1i56nLZehbv-d2ZR2WIG1FFA9A6YvKCtdn5veLgVJdNOyj-8Ikde0eCVHBy7K2DG8kQkWSUsJNCcxoqWYfU3x-8cY6SDdJeiwkxKXv1qOv1YUOoxq4-ctVBaS3umPznwTuo_lyN4cOTNnRc5hQ5z4u9sNnciHBn5nNugtEf8OsTvK0Clg0uDoO5bYXPcdh3LZ3niNIKmr4FWcEJvjwAmxFn9KbcSREj3x6sHF7UUUv3TWQZ0NB0K4bXHmr9m3RT7zzZHnbNKqKTHbnR541Qn7EBQ0QOwiaKEaVZ_YYkDHcBS0TqWEmF1zvWgHDmsEGDC0F43YgoJKvGZwaqoSswY4ckdZ4q6UJiE2W5qecB-EN5VQMs5tYaMqX1BamG8JT_DbMw3tStiSufslRkyiDtz5vlaL3QtLBzfntGbjE_pOMPPP22PsGK5u_V8TEnKbAr1XnfcE6uakpBpRGlVqwE993fxGoEIY3_f9pkdF74WUOjjdyl4BTwaypj4iKxe5QHI_yhwlK1rm5ntRUFL12E61lBn0TOjjZSGcmdqQ6MqL8JOzAGNLkJ-5smYFD-fOW7m1ngtQichBNGrxr6Rcf03--cybJm6Y4W_7UxzfsZPOvpDfsMKk5e9uU5vUla4FhzwdukhqQ5OVsvpvC0WhQlRwcNjOVIVNTD5ueu4qH3yK8PkLkCmskiAhMZuVEnfWCfxVGbpL5e2naxIbEdVljY-103MFosaaXvD1ZIdDoEiTMDBbiFEJyEa7bPOupJJ7jPm5RZ9rKVUn532YlRd0Ust9H9e_Ratn7iTVnRxTZ4uB_NR3gC3GFx03daBGiy0EHbHzlgrWzYSH_yx1bmfZd4c-M0URpqabrSZ7lJccPNdE8ZlVNUtvKCwhUJhTmGGIgHXZv0zrRpNZsjqoDUfrxpu3MRFB2waIxzQkfGfv2z4HMDrGWK-sn2avuBBTU_hXBPSS3v8BbGbo49rVERehgQz03rZD6gpfFr95IcWNY4wasL6WQhgMA0T_IzggbVC1RjB4zRBmKB_qbndXH5V3nQE23Rb1wOpuYSbT3RIXb8gAuN7wxWbGWNw4tOTORScOnTJ43kVZxMgNciQx5OMfcgy0OsuW6ageK299HBhYuhpDPRDX_8pkqGnkHVbfWiDHxvRbMsemyhuZuH8iQkVuTROxvNPFWkIJBbTkMmusU72PM_oEEmHtmiInsV_SnTafTHIe3fjDrmIpaRudkdegSQ400zzNbUCRFrszZAFNoUcVvrsfi5oAxQ68YXLmrlxzzDD6RxfiqZTtKbNUXdi5k879ER7yyuzpqO7a1tKUrwpD_Vb6S-aCV9e6cyAJguHEU3w9WQxRwE1FMK6yaOpYtsQxM8_c6-bXauzxm9mdvBtDv1lSsEUsL4'},
        {name: 'Sasha', age: '35', userId: 2, isFollowed: true,
            address: { country: 'Ukraine', city: 'Kiev' },  
            avatar: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/1a697a67-d844-42ba-b367-071c4a581462/280x420'},
        {name: 'Alex', age: '25', userId: 3, isFollowed: false,
            address: { country: 'Belarus', city: 'Minsk' },  
            avatar: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/3acd328c-721a-47ac-a7bf-fe7d5efb69fc/280x420'},
    ],
    usersCount: 0,
   
};


const usersReducer = (state = initialState, action) => {
     switch (action.type) {

        case FOLLOW:  
            let postMessage = state.newPostText;
            return {
                ...state,
                users: [...state.users, { id: 5, message: postMessage, likeCounter: 0} ],
            };

         case UNFOLLOW:
            return {
                ...state,
                newPostText: action.newText
            };
        
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            };

        default: 
            return state;
    }
};

export let followAC = (userID) => ({ type: FOLLOW, userID: userID });
export let unfollowAC = (userID) => ({ type: UNFOLLOW, userID: userID });
export let setUsersAC = (users) => ({ type: SET_USERS, users});












export default usersReducer;