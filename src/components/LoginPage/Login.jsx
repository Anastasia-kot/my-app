import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import styles from './Login.module.css';
import { getLogined } from '../../redux/auth-reducer.ts';
import { getIsAuth } from '../../redux/auth-selectors.ts';
import {  useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export const Login = React.memo(( ) => {

    const isAuth = useSelector(getIsAuth)

    const dispatch = useDispatch();

    if (isAuth) return <Navigate replace to='/users' />

    return (
    
        <div className={styles.login}>
            <Formik
                initialValues={{ email: '', password: '', rememberMe: false }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        dispatch(getLogined( values.email, values.password, values.rememberMe ))
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.form}>
                        <label> <span className={styles.labelSpan}>email</span>
                            <Field type="email" name="email" className={styles.field} autoComplete="email" /> 
                            <ErrorMessage name="email" component="div" className={styles.ErrorMessage} />
                        </label>
                        
                        <label> <span className={styles.labelSpan}>password</span>
                            <Field type="password" name="password" className={styles.field} autoComplete="current-password"/>  
                            <ErrorMessage name="password" component="div" className={styles.ErrorMessage} />
                        </label>
                        <label> 
                            <Field type="checkbox" name="rememberMe" className={styles.field} />
                            <span >Remember me</span>
                        </label>
                       
                        <button type="submit" disabled={isSubmitting} className={styles.button}>
                            Log In
                        </button>
                    </Form>
                )}
            </Formik>
        </div>

    );
})


 
 