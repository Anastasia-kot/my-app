// import React from "react";
// import isLoading from '../../pictures/isLoading.gif';
// import styles from './Preloader.module.css';



// const Preloader = () => {
//     return (<div><img src={isLoading} className={styles.loader} alt='loader' /> </div>)
// }

// export default Preloader;

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

const Preloader = () => <Spin indicator={antIcon} />;

export default Preloader;