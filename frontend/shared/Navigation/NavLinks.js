import styles from './NavLinks.module.css'
import Link from 'next/link';
import {authActions} from '../../store/auth-store'
import { useSelector,useDispatch } from 'react-redux';
export default function NavLinks(props){

    const isLoggedIn = useSelector(state=>state.isLoggedIn)
    const dispatch = useDispatch()

    const logoutHandler = () =>{
        dispatch(authActions.logout())
    }
    return(
        <ul  className={styles['nav-links']}>
            <li>
                <Link href="/">All users</Link>
            </li>
            {isLoggedIn&&<li>
                <Link href="/u1/places">My places</Link>
            </li>}
            {isLoggedIn &&<li>
                <Link href="/places/new">Add place</Link>
            </li>}

            {isLoggedIn &&<li>
                <Link href="/"><a onClick={logoutHandler}>Logout</a></Link>
            </li>}

            {!isLoggedIn&&<li>
                <Link href="/auth">Authenticate</Link>
            </li>}
        </ul>
    )
}