import React from "react";
import * as axios from 'axios';
import styles from './Users.module.css';



class Users extends React.Component {
   
   
   

    componentDidMount(){
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.count}&page=${this.props.currentPage}`)
            .then(response => { 
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    };


    setCurrentPage (p) {
        this.props.setCurrentPage(p);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.count}&page=${p}`)
            .then(response => { this.props.setUsers(response.data.items) });
    };
    

    render() {
        let pagesCount = Math.ceil( this.props.totalCount / this.props.count );
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            
            if (i<=5 || i>= (pagesCount-5)) { pages.push (i) }
        }

        return <div>

                {pages.map(p => {
                return (
                    <span key = {p} 
                        className={(p === this.props.currentPage) ? styles.selected : ''} 
                        onClick={() => this.setCurrentPage(p)}> {p} </span>
                    )
                })}
                 

                {this.props.users.map(u => {
                return (
                    <div key={u.id} className={styles.userCardContainer}>
                        <div className={styles.userCard}>
                            <img className={styles.avatar} alt='avatar'
                                src={u.photos.small ? u.photos.small : 'https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png'} />
                            <br />
                            {u.name}
                            <div>
                                {u.followed
                                    ? <button onClick={() => this.props.unFollowUser(u.id)}> Unfollow </button>
                                    : <button onClick={() => this.props.followUser(u.id)}>   Follow   </button>}
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
    
};

}

export default Users;