import React from "react";


import styles from './MainHeader.module.css'


export default function MainHeader(props){

    return(
        <header className={styles['main-header']}>
            {props.children}
        </header>
    )
}