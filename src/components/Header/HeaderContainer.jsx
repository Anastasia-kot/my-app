import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { getAuthUserData } from '../../redux/auth-reducer';
import Header from './Header';

class HeaderContainer extends React.Component  {
    componentDidMount() {
        this.props.getAuthUserData();
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


export default connect(MapStateToProps, { getAuthUserData })(HeaderContainer);