import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import ProfileContainerWithParams from './components/Profile/ProfileContainerWithParams';
import Login from './components/LoginPage/Login';


const App = () => {

  return (
  
      <div className='page-wrapper'>
        <Header />
        <Navbar />
        <div className='mainContent'>
          <Routes>
            
            <Route path='/dialogs/*' element={<DialogsContainer />} />
            <Route path='/profile/:id' element={<ProfileContainerWithParams />} />
            <Route path='/profile/' element={<ProfileContainerWithParams />} />
            <Route path='/users/*' element={<UsersContainer />} />
            <Route path='/login' element={<Login />} />

        

          </Routes>
        </div>
      </div>
 
  );
}


export default App;
