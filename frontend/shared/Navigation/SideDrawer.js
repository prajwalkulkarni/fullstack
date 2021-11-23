import React from "react";
import styles from './SideDrawer.module.css'


export default function SideDrawer(props){
    return(
        <aside className={styles['side-drawer']} onClick={props.onClick}>{props.children}</aside>
    )
}