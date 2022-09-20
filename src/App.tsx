import React, { Suspense } from 'react';

import { Layout } from 'antd';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore

import { getInitialized } from './redux/auth-reducer.ts';

import { MyHeader }  from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Login } from './components/LoginPage/Login';
// @ts-ignore
import { Preloader } from './components/common/Preloader/Preloader.tsx';
// @ts-ignore

import { Profile }  from './components/Profile/Profile.tsx';
// @ts-ignore

import { Users } from './components/Users/Users.tsx';
// @ts-ignore

import { ChatPage } from './components/ChatPage/ChatPage.tsx';
// @ts-ignore

import { getInitializedState } from './redux/auth-selectors.ts';
// @ts-ignore

const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs.tsx'));
 
const {  Content } = Layout;
 
 
 
export const App = React.memo((props) => {

    const initialized = useSelector(getInitializedState);

    const dispatch = useDispatch();

      React.useEffect(() => {
        dispatch( getInitialized())
      }, [dispatch])


  if (!initialized) { return <Preloader></Preloader> }  

  return   (<div>
    <Layout>
        <MyHeader />

      
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
                  <Route path='/dialogs/:id' element={<Dialogs />} />
                  <Route path='/dialogs/' element={<Dialogs />} />
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




 


  // (<div>
  //   <Layout>
  //       <MyHeader />

      
  //       <Layout>
  //         <Navbar />
        


  //           <Content
  //             className="site-layout-background"
  //             style={{
  //               padding: 24,
  //               margin: 0,
  //               minHeight: 280,
  //             }}
  //           >
  //             <Suspense fallback={<div>Loading...</div>}>
  //               <Routes>

  //                 <Route path='/dialogs/*' element={<Dialogs />} />
  //                 <Route path='/chat' element={<ChatPage />} />
  //                 <Route path='/profile/:id' element={<Profile />} />
  //                 <Route path='/profile/' element={<Profile />} />
  //                 <Route path='/users/*' element={<Users />} />
  //                 <Route path='/login' element={<Login />} />
  //                 <Route path='/' element={<Dialogs />} />





  //               </Routes>
  //             </Suspense>
  //           </Content>
  //        </Layout>
  //     </Layout>

  // </div>)