import Card from "../../shared/UIElements/Card"
import styles from './PlaceItem.module.css'
import React, { useState } from "react"
import Modal from '../../shared/UIElements/Modal'
import Button from "../../shared/FormElements/Button"
export default function PlaceItem(props){

    const [showMap,setShowMap] = useState(false)

    const openMapHandler = () => setShowMap(true)
    const closeMapHandler = () => setShowMap(false)
    return(

        <React.Fragment>
            <Modal 
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass='place-item__modal-content'
                footerClass='place-item__modal-actions'
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>

                <div className={styles['map-container']}>
                    <h3>GOOGLE MAPS</h3>
                </div>
            </Modal>

        <li key={props.id} className={styles['place-item']}>
            <Card className={styles['place-item__content']}>
                <div className={styles['place-item__image']}>
                    <img src={props.image} alt={props.title} />

                </div>
                <div className={styles['place-item__info']}>
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className={styles['place-item__actions']}>
                    <Button onClick={openMapHandler} inverse>View on map</Button>
                    <Button to={`/places/${props.id}`}>Edit</Button>
                    <Button danger>Delete</Button>
                </div>
            </Card>
        </li>
        </React.Fragment>
    )
}