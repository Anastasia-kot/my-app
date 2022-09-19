import React from 'react';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUnLogined } from '../../redux/auth-reducer.ts';
import { getIsAuth, getAuthLogin } from '../../redux/auth-selectors.ts';
import {  Layout } from 'antd';
 import {ReactComponent as LO } from '../../pictures/mao_logo.svg';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
 
 


const { Header } = Layout;

export const MyHeader = React.memo(() => {

    const isAuth = useSelector(getIsAuth);
    const myLogin = useSelector(getAuthLogin);
        
    const dispatch = useDispatch();

    const getUnLoginedOnClick = () =>{
       dispatch( getUnLogined())
    }

    const navigate = useNavigate();

return (
      

    <Header className="header">
        <div className={styles.header}>
        <div className="logo" />
             <LO className={styles.logo} alt='logo' /> 
 
            <span className={styles.login}> {myLogin}
            
                       
                <Button 
                    className={styles.logoutButton} 
                    onClick={() => {
                            isAuth ? getUnLoginedOnClick() : navigate('/login', { replace: true })
                        }}>
                    {isAuth ? 'log_out' : 'login'}
                </Button>
                  
         </span>
            </div>
    </Header>)})

 