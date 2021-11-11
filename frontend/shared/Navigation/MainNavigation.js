import MainHeader from "./MainHeader"
import Link from 'next/link'
import styles from './MainNavigation.module.css'
import NavLinks from "./NavLinks"
import SideDrawer from "./SideDrawer"
import React, { useState } from "react"
import Backdrop from "../UIElements/Backdrop"
export default function MainNavigation(props){

    const [drawer,setDrawerVisibility] = useState(false)

    const openDrawer = () =>{

        setDrawerVisibility(true)
    }

    const closeDrawer = () =>{
        setDrawerVisibility(false)

    }
    return(
        <React.Fragment>
            {drawer && <Backdrop onClick={closeDrawer}/>}
            {drawer && <SideDrawer onClick={closeDrawer}>
                <nav className={styles['main-navigation__drawer-nav']}>
                    <NavLinks />
                </nav>
            </SideDrawer>}
            <MainHeader>
                <button className={styles['main-navigation__menu-btn']}  onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className={styles['main-navigation__title']}>
                    <Link href="/">
                        <a>Your places</a>
                    </Link>
                </h1>

                <nav className={styles['main-navigation__header-nav']}>
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )

}