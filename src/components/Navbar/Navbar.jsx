import React from 'react';
import { Router } from "react-history-router";

import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { TeamOutlined , SettingOutlined, LaptopOutlined, NotificationOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
 import {  Layout, Menu } from 'antd';


 
const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('My Profile', 'sub1', <UserOutlined />, [
        getItem('Profile', 'sub11', <LaptopOutlined/>,  ),
        getItem('Dialogs', 'sub12', <MessageOutlined />,  ),
    ]),
    getItem('Users', 'sub2', <TeamOutlined /> ),
    getItem('News', 'sub3', <NotificationOutlined />, ),
    getItem('Settings', 'sub4', <SettingOutlined />,  ),
];

{/* <nav className={styles.navbar}>
            <NavLink to='/profile' className={styles.item}>Profile</NavLink> 
            <NavLink to='/users' className={styles.item}>Users</NavLink
            <NavLink to='/dialogs' className={styles.item}>Dialogs</NavLink>
            <NavLink to='/news' className={styles.item}>News</NavLink>
            <NavLink to='/music' className={styles.item}>Music</NavLink>
            <NavLink to='/settings' className={styles.item}>Settings</NavLink>
    </nav> */}

const Navbar = () => {


    const onClick  = e => {
        console.log('click ', e);
     };


 
    
    return (
        <div>
    
      <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              onClick={onClick}

              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
                    items={items}
            />
          </Sider>
          <Layout
                style={{
                padding: '0 24px 24px',
                }}
          >
            </Layout>
   
        </div>);
}

export default Navbar;



