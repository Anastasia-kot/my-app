import React from 'react';
import styles from './Post.module.css';
import { UserOutlined } from '@ant-design/icons';



export const Post = (props) => {

 

    return (<div>
        <UserOutlined 
            className={styles.avatar}   
            style={{ fontSize: '50px', color: 'black', width: '60px', height: '60px' }}/>
         {props.message} 
        <div>
            {props.likeCounter}
            <span> likes </span>
        </div>
    </div>
    );
}

 