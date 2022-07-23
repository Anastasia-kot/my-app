import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  getUnLogined } from '../../redux/auth-reducer.ts';
import Header from './Header';

class HeaderContainer extends PureComponent  {
   

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


export default connect(MapStateToProps, { getUnLogined })(HeaderContainer);