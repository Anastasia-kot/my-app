import React from 'react';
import styles from './Header.module.css';

const Header = () => {
    return (<header className={styles.header}>
        <img src='https://static-cse.canva.com/blob/232570/coco.jpg' alt='logo'/>
    </header>);
}

export default Header;