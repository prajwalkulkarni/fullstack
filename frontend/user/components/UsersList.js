import React from "react";
import UserItem from "./UserItem";

import styles from '../../styles/UsersList.module.css'

export default function UsersList(props){

    if(props.items.length===0){
        return(
            <div className={styles.center}>
                <h2>No users found</h2>
            </div>
        )
    }


    return <ul className={styles['users-list']}>
        {props.items.map(user=>{
            return <UserItem key={user.id} id={user.id} image={user.image} name={user.name}
            placeCount={user.places}/>
        })}
    </ul>

}