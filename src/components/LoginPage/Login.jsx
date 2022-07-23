import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import styles from './Login.module.css';
import { getLogined } from '../../redux/auth-reducer.ts';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';


const Login = React.memo((props) => {
    if (props.isAuth) return <Navigate replace to='/profile' />

    return (
    // <h1 className={styles.h1}> LOGIN </h1>
    
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
                        props.getLogined( values.email, values.password, values.rememberMe )
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


const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth
    }
};

export default connect(mapStateToProps, { getLogined })(Login);