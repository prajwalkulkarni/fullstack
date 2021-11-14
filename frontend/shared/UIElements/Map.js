import { useEffect, useRef } from "react"
import styles from './Map.module.css'
export default function Map(props){

    const mapRef = useRef()

    useEffect(()=>{
        const map = new window.google.maps.Map(mapRef.current,{
            center:props.center,
            zoom:props.zoom
        })
    
        new window.google.maps.Marker({position:props.center, map:map});
    },[props.center,props.zoom])
    
    return(
        <div className={styles[`map`]}
        ref={mapRef}
        style={props.style}>
            
        </div>
    )
}