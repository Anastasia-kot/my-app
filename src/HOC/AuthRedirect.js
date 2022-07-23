import React from "react";
import { Navigate } from "react-router-dom";

export const withAuThRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render(){
            if (!this.props.isAuth) return <Navigate replace to='/login'/>
            return <Component {...this.props} />
        }
    }
    return RedirectComponent
}