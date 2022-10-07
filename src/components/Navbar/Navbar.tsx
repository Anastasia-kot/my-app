import React from 'react';
import { useNavigate  } from "react-router-dom";
import { TeamOutlined , SettingOutlined, LaptopOutlined, 
  NotificationOutlined, UserOutlined, MessageOutlined, WechatOutlined } from '@ant-design/icons';
import {  Layout, Menu } from 'antd';


 
const { Sider } = Layout;

function getItem(label: string, key: Keys, icon: any, children?:Array<any>, type?:any) {
    return { key, icon, children, label, type };
}

const items = [
    getItem('Profile', 'sub1', <UserOutlined />, [
        getItem('Profile', 'sub11', <LaptopOutlined/>,  ),
        getItem('Dialogs', 'sub12', <MessageOutlined />,  ),
        getItem('Chat', 'sub13', <WechatOutlined />,  ),
    ]),
    getItem('Users', 'sub2', <TeamOutlined /> ),
    getItem('News', 'sub3', <NotificationOutlined />, ),
    getItem('Settings', 'sub4', <SettingOutlined />,  ),
];

type Keys = 'sub1'| 'sub11'| 'sub12'| 'sub13'| 'sub2'| 'sub3'|'sub4'; 

export const Navbar = () => {

    const navigate = useNavigate();

    const onClickFunc = (e: { key: Keys; }) => {
        let address = '';
        switch (e.key) {
            case 'sub1': address = '/profile'; break;
            case 'sub11': address = '/profile'; break;
            case 'sub12': address = '/dialogs'; break;
            case 'sub13': address = '/chat'; break;
            case 'sub2': address = '/users'; break;
            case 'sub3': address = '/news'; break;
            case 'sub4': address = '/settings'; break;
            default: break;
        }
        navigate(address, { replace: true });
      };

    return (
        <div>
    
      <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              // @ts-ignore
              onClick={onClickFunc}
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

 


