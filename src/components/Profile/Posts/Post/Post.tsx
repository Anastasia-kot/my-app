import React from 'react';
// import styles from './Post.module.css';
// @ts-ignore
import { Avatar } from '../../../common/Avatar/Avatar.tsx';


type Props = {
    message:string
    id:number
    likeCounter: number
    photo?: string | null
    onClickLike: (isLiked: boolean, postId: number) => void
}

export const Post: React.FC<Props> = ({ message, id, likeCounter, photo, onClickLike }) => {

    return (
        <div>
            <span><Avatar width={60} photo={photo}/> {message}</span> 
            <sup style={{ 'marginLeft': '5px', 'color': 'red', 'display': 'inline-block' }}> 
                {likeCounter} 
                <button 
                    style={{ 'margin': '0', 'padding': '0', 'backgroundColor': 'none', 'border': 'none', 'cursor': 'pointer'}}
                    onClick={()=>{
                        onClickLike(true, id)}
                        }>
                        ♡</button> 
            </sup>
        </div>
    );
}

 