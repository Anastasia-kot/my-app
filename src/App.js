import './App.css';
import React, { PureComponent, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { getInitialized } from './redux/auth-reducer.ts';


import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/LoginPage/Login';
import Preloader from './components/Services/Preloader';
import ProfileContainerWithParams from './components/Profile/ProfileContainerWithParams';
// const ProfileContainerWithParams = React.lazy(() => import('./components/Profile/ProfileContainerWithParams'));

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import ('./components/Users/UsersContainer'));




class App extends PureComponent  {
  componentDidMount() {
    this.props.getInitialized();
  }
  render(){
    if (!this.props.initialized) {return <Preloader/>}
    return (
  
      <div className='page-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='mainContent'>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/profile/:id' element={<ProfileContainerWithParams />} />
              <Route path='/profile/' element={<ProfileContainerWithParams />} />
              <Route path='/users/*' element={<UsersContainer />} />
           
              <Route path='/login' element={<Login />} />
              {/* <Route path='/' element={<ProfileContainerWithParams />} /> */}

           
        

            </Routes>
          </Suspense>
        </div>
      </div>
 
  );
}
}



const MapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuth,
    data: state.authReducer.data,
    initialized: state.authReducer.initialized
  }
};


export default connect(MapStateToProps, { getInitialized })(App);