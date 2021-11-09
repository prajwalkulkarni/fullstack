import React from "react";
import styles from '../../styles/UserItem.module.css'
import Avatar from "../../shared/UIElements/Avatar";
import Link from 'next/link'
import Card from "../../shared/UIElements/Card";
export default function UserItem(props){

    return(
        <li className={styles['user-item']}>
            <Card className={styles['user-item__content']}>

                <Link href={`/${props.id}/places`}>
                    <a>
                    <div className={styles['user-item__image']}>
                        <Avatar image={props.image} alt={props.name} />
                    </div>

                    <div className={styles['user-item__info']}>
                        <h2>{props.name}</h2>
                        <h3>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
                    </div>
                    </a>

                </Link>
            </Card>

            
        </li>
    )
}