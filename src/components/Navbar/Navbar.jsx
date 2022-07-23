import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return (<nav className={styles.navbar}>
       
            <NavLink to='/profile' className={styles.item}>Profile</NavLink>
       
            <NavLink to='/users' className={styles.item}>Users</NavLink>
       
            <NavLink to='/dialogs' className={styles.item}>Dialogs</NavLink>
      
            <NavLink to='/news' className={styles.item}>News</NavLink>
     
            <NavLink to='/music' className={styles.item}>Music</NavLink>
       
            <NavLink to='/settings' className={styles.item}>Settings</NavLink>
      
    </nav>);
}

export default Navbar;