import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reducer';
import Header from './Header';

class HeaderContainer extends React.Component  {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0//auth/me`, {withCredentials: true})
            .then(response => {

                if (response.data.resultCode === 0) {
                    this.props.setAuthUserData(response.data.data);
                }
            });
    }

    render() {
        return (<Header {...this.props} />);
    }
}

const MapStateToProps = (state) =>  {
    return {
        isAuth: state.authReducer.isAuth,
        data: state.authReducer.data
    }
};


export default connect(MapStateToProps, { setAuthUserData })(HeaderContainer);