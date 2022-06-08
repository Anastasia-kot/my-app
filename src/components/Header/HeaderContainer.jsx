import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { getAuthUserDataWithAPI } from '../../API/api';
import { setAuthUserData } from '../../redux/auth-reducer';
import Header from './Header';

class HeaderContainer extends React.Component  {
    componentDidMount() {
        
        getAuthUserDataWithAPI()
            .then(response => { if (response.resultCode === 0) { this.props.setAuthUserData(response.data) }
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