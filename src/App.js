import './App.css';
// import 'antd/dist/antd.css';
import React, { Suspense } from 'react';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';

import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialized } from './redux/auth-reducer.ts';

import MyHeader  from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Login from './components/LoginPage/Login';
import Preloader from './components/Services/Preloader';
import Profile  from './components/Profile/Profile';
// const ProfileContainerWithParams = React.lazy(() => import('./components/Profile/ProfileContainerWithParams'));


const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs.tsx'));
const Users = React.lazy(() => import('./components/Users/Users.tsx'));




const {  Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});






const App = React.memo((props) => {

    const initialized = useSelector(state=>state.authReducer.initialized);

    const dispatch = useDispatch();

      React.useEffect(() => {
        dispatch( getInitialized())
      }, [])


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




export default App;


