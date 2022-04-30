import React from 'react';
import User from './User/User';




const Users = (props) => {

  //  let postsElements = props.posts.map((p) => { return (<Post message={p.message} likeCounter={p.likeCounter} key={p.id} />) });

    let usersElements = props.users.map((u) => { return <User name={u.name} 
        avatar={u.avatar} address={u.address} isFollowed={u.isFollowed} userId={u.userId} /> }); 



    return (

        <div>
            {usersElements}

            <button>Load users</button>
        </div>
       

    );
}


export default Users;
