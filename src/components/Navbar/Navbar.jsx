import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return (<nav className={styles.navbar}>
        <div>
            <NavLink to='/profile' className={styles.item}>Profile</NavLink>
        </div>
        <div>
            <NavLink to='/dialogs' className={styles.item}>Dialogs</NavLink>
        </div>
        <div>
            <NavLink to='/news' className={styles.item}>News</NavLink>
        </div>
        <div>
            <NavLink to='/music' className={styles.item}>Music</NavLink>
        </div>
        <div>
            <NavLink to='/settings' className={styles.item}>Settings</NavLink>
        </div>
    </nav>);
}

export default Navbar;