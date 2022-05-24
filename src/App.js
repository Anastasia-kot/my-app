import './App.css';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';

import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';


const App = () => {

  return (
  
      <div className='page-wrapper'>
        <Header />
        <Navbar />
        <div className='mainContent'>
          <Routes>
            
            <Route path='/dialogs/*' element={<DialogsContainer />} />
            <Route path='/profile/*' element={<ProfileContainer />} />
            <Route path='/users/*' element={<UsersContainer />} />
        

          </Routes>
        </div>
      </div>
 
  );
}


export default App;
