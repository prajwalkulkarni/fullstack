
import dynamic from 'next/dynamic'
// import UpdatePlace from '../../places/components/UpdatePlace'
import styles from '../../shared/Navigation/MainHeader.module.css'
import React from 'react'
const DUMMY_PLACES=[
    {
        id:'p1',
        title:'Empire state building',
        description:'Sky scraper',
        imageUrl:'https://lh5.googleusercontent.com/p/AF1QipPNYKu1SitKYE1uO_NrbfLa7LJMf1m5eD4p1D0y=w408-h272-k-no',
        address:'20 W 34th St, New York, NY 10001, United States',
        location:{
            lat:40.7484405,
            lng:-73.9878531
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Empire state building',
        description:'Sky scraper',
        imageUrl:'https://lh5.googleusercontent.com/p/AF1QipPNYKu1SitKYE1uO_NrbfLa7LJMf1m5eD4p1D0y=w408-h272-k-no',
        address:'20 W 34th St, New York, NY 10001, United States',
        location:{
            lat:40.7484405,
            lng:-73.9878531
        },
        creator:'u2'
    }
]
const UpdatePlace = dynamic(()=>import('../../places/components/UpdatePlace'))
export default function UpdatePlacePage(props){

    return(
        <main className={styles['main']}>
            <UpdatePlace placeToBeUpdated={props.filteredPlaces}/>
        </main>
        
    )
}



export function getStaticPaths(){

    return {
        paths:[
            {
            params:{
                placeId:'p1'
            }
        }
        ],
        fallback:false
    }
}
export function getStaticProps(context){

    // const router = useRouter()

    const filteredPlaces = DUMMY_PLACES.find(place=>place.id===context.params.placeId)
    //console.log("called")

    return {
        props:{
            filteredPlaces
        }
    }


}