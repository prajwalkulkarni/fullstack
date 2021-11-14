import styles from './NewPLace.module.css'
import Input from '../../shared/FormElements/Input'
import { useForm } from '../../shared/hooks/form-hook'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import Button from '../../shared/FormElements/Button'

export default function NewPlaces(props){

    const {formState,inputHandler} = useForm({
        title:{
            value:'',
            isValid:false
        },
        description:{
            value:'',
            isValid:false
        },
        address:{
            value:'',
            isValid:false
        }
    },false)
    
    const placeSubmitHandler = event =>{
        event.preventDefault()

        console.log("recevied details")
    }

    return (
        <form className={styles['place-form']} onSubmit={placeSubmitHandler}>

            <Input id="title" type="text" label="Title" element="input"
                errorText="Please enter a valid input"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler} />

            <Input id="description" type="textarea" label="Description"
                errorText="Description should be of atleast 10 characters."
                validators={[VALIDATOR_MINLENGTH(10)]}
                onInput={inputHandler} />
            
            <Input id="address" type="input" element="input" label="Address"
                errorText="Address cannot be empty"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler} />

            <Button type="submit" disabled={!formState.isValid}>Add place</Button>
            
        </form>
    )
}