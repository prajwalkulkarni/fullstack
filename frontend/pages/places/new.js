import NewPlaces from "../../places/components/NewPlaces";
import styles from '../../shared/Navigation/MainHeader.module.css'
export default function AddPlace(){

    return(
        <main className={styles['main']}>
        <NewPlaces/>
        </main>
    )
}