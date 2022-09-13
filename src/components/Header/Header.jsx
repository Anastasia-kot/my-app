import React from 'react';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUnLogined } from '../../redux/auth-reducer.ts';
import {  Layout } from 'antd';


const { Header } = Layout;

const MyHeader = React.memo((props) => {

    const isAuth = useSelector(state=> state.authReducer.isAuth);
    const data = useSelector(state => state.authReducer.data);
        
    const dispatch = useDispatch();

    const getUnLoginedOnClick = () =>{
       dispatch( getUnLogined())
    }


return (
      

    <Header className="header">
        <div className="logo" />
        <img className={styles.logo} src='https://static-cse.canva.com/blob/232570/coco.jpg' alt='logo' />

 
        <span className={styles.login}>
            {isAuth
                ? <>
                    {data.login}
                    <button className={styles.logoutButton} onClick={() => getUnLoginedOnClick()}>
                        log_out
                    </button></>
                : 'login'}
        </span>
    </Header>)})

export default MyHeader;