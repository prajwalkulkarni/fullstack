import Card from "../../shared/UIElements/Card"
import PlaceItem from "./PlaceItem"
import styles from './PlaceList.module.css'
import Button from "../../shared/FormElements/Button"
export default function PlaceList(props){


    if(props.items.length===0){
        return <div className={styles['place-list center']}>

            <Card>
                <h2>No places found, add one</h2>
                <Button to="/places/new">Share place</Button>
            </Card>
        </div>
    }


    return(
        <ul className={styles['place-list']}>
            {props.items.map(place=>{
                return(
                    <PlaceItem key={place.id} id={place.id}
                    image={place.imageUrl} 
                    title={place.title}
                    desc={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}/>
                )
            })}
        </ul>
    )

}