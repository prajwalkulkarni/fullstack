import {useRouter} from 'next/router'
import PlaceList from '../../places/components/PlaceList'
import styles from '../../shared/Navigation/MainHeader.module.css'

const DUMMY_PLACES=[
    {
        id:'p1',
        title:'Empire state building',
        description:'Sky scraper',
        imageUrl:'https://lh5.googleusercontent.com/p/AF1QipPNYKu1SitKYE1uO_NrbfLa7LJMf1m5eD4p1D0y=w408-h272-k-no',
        address:'20 W 34th St, New York, NY 10001, United States',
        location:{
            lat:40.7484405,
            lnt:-73.9878531
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
            lnt:-73.9878531
        },
        creator:'u2'
    }
]

export default function Places(){


    const router = useRouter()

    console.log(router.query.userId)

    const filteredPlaces = DUMMY_PLACES.filter(place=>place.creator===router.query.userId)

    

    return(
        <main className={styles['main']}>
            <PlaceList items={filteredPlaces}/>
        </main>
        
    )
}