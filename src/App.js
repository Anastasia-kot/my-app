import React, { Suspense } from 'react';

import { Layout } from 'antd';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialized } from './redux/auth-reducer.ts';

import { MyHeader }  from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Login } from './components/LoginPage/Login';
import { Preloader } from './components/Services/Preloader';
import { Profile }  from './components/Profile/Profile.tsx';
import { Users } from './components/Users/Users.tsx';
import { ChatPage } from './components/ChatPage/ChatPage.tsx';

const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs.tsx'));
 
const {  Content } = Layout;
 
 
 
export const App = React.memo((props) => {

    const initialized = useSelector(state=>state.authReducer.initialized);

    const dispatch = useDispatch();

      React.useEffect(() => {
        dispatch( getInitialized())
      }, [dispatch])


    if (!initialized) {return <Preloader/>}

  return (
    <div>
      <Layout>
        <MyHeader  />

      
        <Layout>
          <Navbar />
        


            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>

                  <Route path='/dialogs/*' element={<Dialogs />} />
                  <Route path='/chat' element={<ChatPage />} />
                  <Route path='/profile/:id' element={<Profile />} />
                  <Route path='/profile/' element={<Profile />} />
                  <Route path='/users/*' element={<Users />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/' element={<Dialogs />} />





                </Routes>
              </Suspense>
            </Content>
         </Layout>
      </Layout>

    </div>)
})




 


