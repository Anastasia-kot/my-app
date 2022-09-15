import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import dialogsReducer from "./dialogs-reducer.ts";
import profileReducer from "./profile-reducer.ts";
import authReducer from "./auth-reducer.ts";
import usersReducer from "./users-reducer.ts";
import chatReducer from "./chat-reducer.ts";




let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    authReducer: authReducer,
    // authPage: authReducer,
    chatPage: chatReducer,

})


export type InferActionsTypes<T extends {[key: string]:(...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, compose(
    applyMiddleware(thunk)
));
 
// window.store = store;