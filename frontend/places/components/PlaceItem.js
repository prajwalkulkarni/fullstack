import Card from "../../shared/UIElements/Card"
import styles from './PlaceItem.module.css'
import React, { useState } from "react"
import Modal from '../../shared/UIElements/Modal'
import Button from "../../shared/FormElements/Button"
import Map from "../../shared/UIElements/Map"
import Head from 'next/head'

export default function PlaceItem(props){

    const [showMap,setShowMap] = useState(false)
    const [showConfirmModal,setShowConfirmModal] = useState(false)

    const openMapHandler = () => setShowMap(true)
    const closeMapHandler = () => setShowMap(false)

    const showDeleteWarningHandler = () => setShowConfirmModal(true)
    const cancelDeleteHandler  = () => setShowConfirmModal(false)

    const confirmDeleteHandler = () =>{
        setShowConfirmModal(false)
        console.log("Delete")
    }
    return(

        <React.Fragment>
            <Head>
            <script
    src="https://maps.googleapis.com/maps/api/js?key=API_KEY" async defer>
</script>
            </Head>
            <Modal 
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass='place-item__modal-content'
                footerClass='place-item__modal-actions'
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>

                <div className={styles['map-container']}>
                    <Map center={props.coordinates} zoom={10}/>
                </div>
            </Modal>
            <Modal 
                show={showConfirmModal}
                header="Are you sure"
                contentClass='place-item__modal-content'
                footerClass='place-item__modal-actions'
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
                        <Button danger onClick={confirmDeleteHandler}>Delete</Button>
                    </React.Fragment>
                }>

                <p>
                    Are you sure you'd want to delete this item?
                    Note that, this action can't be undone thereafter.
                </p>
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
                    <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
                </div>
            </Card>
        </li>
        </React.Fragment>
    )
}