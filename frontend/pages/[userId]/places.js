import store from '../../store/auth-store'
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



export default function Places(props){

    // console.log(router.query.userId)

    

    

    return(
        <main className={styles['main']}>
            <PlaceList items={props.filteredPlaces}/>
        </main>
        
    )
}


export function getStaticPaths(){

    return {
        paths:[
            {
            params:{
                userId:'u1'
            }
        },
        {
            params:{
                userId:'u2'
            }
        }
        ],
        fallback:false
    }
}


export function getStaticProps(context){

    // const router = useRouter()

    const selector = store.getState()

    if(!selector.isLoggedIn){
        return {
            redirect:{
                permanent:false,
                destination:'/auth'
            }
        }
    }

    const filteredPlaces = DUMMY_PLACES.filter(place=>place.creator===context.params.userId)
    //console.log("called")

    return {
        props:{
            filteredPlaces
        }
    }


}