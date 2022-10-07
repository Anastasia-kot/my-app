import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk, { ThunkAction } from 'redux-thunk';
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import usersReducer from "./users-reducer";
import chatReducer from "./chat-reducer";




let RootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    authPage: authReducer,
    chatPage: chatReducer,
})

export type RootState = ReturnType<typeof RootReducer>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
 
export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A> 

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(RootReducer, compose(
    applyMiddleware(thunk)
));
 
// window.store = store;