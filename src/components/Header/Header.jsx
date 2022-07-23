import React from 'react';
import styles from './Header.module.css';

const Header = React.memo(({ isAuth, data, getUnLogined }) => {

return (<div className={styles.header}>
    
    <img className={styles.logo} src='https://static-cse.canva.com/blob/232570/coco.jpg' alt='logo'/>

    <span className={styles.login}>
            {isAuth 
                ? <> 
                    {data.login} 
                    <button className={styles.logoutButton} onClick={getUnLogined}>
                        log_out
                    </button></>
                :'login' }
    </span>
    
</div>);
})

export default Header;