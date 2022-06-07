import React from 'react';
import styles from './Header.module.css';

const Header = (props) => {


    return (<div className={styles.header}>
    
        <img className={styles.logo} src='https://static-cse.canva.com/blob/232570/coco.jpg' alt='logo'/>

        <span className={styles.login}>
            {props.isAuth ?  props.data.login :'login' }
        </span>
    
        
        

        </div>);
}

export default Header;