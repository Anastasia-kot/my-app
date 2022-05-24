import React from "react";
import isLoading from '../../pictures/isLoading.gif';
import styles from './Preloader.module.css';



const Preloader = () => {
    return (<div><img src={isLoading} className={styles.loader} alt='loader' /> </div>)
}

export default Preloader;