import Button from "../../shared/FormElements/Button"
import Input from "../../shared/FormElements/Input"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators"
import { useForm } from "../../shared/hooks/form-hook"
export default function UpdatePlace(props){
    // console.log(props.placeToBeUpdated)

    // const {title} = props.placeToBeUpdated
    const {formState,inputHandler,setFormData} =useForm({
        title:{
            value:props.placeToBeUpdated.title,
            isValid:true
        },
        description:{
            value:props.placeToBeUpdated.description,
            isValid:true
        }
    },true)

    const placeUpdateSubmitHandler = event=>{
        event.preventDefault()

    }
    if(!props.placeToBeUpdated){
        console.log("Invoked")
        return(
            <div>
                <h1>Place not found</h1>
            </div>
        )
    }

    return (
        <form onSubmit={placeUpdateSubmitHandler}>
            <Input id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            value={formState.inputs.title.value}
            valid={formState.inputs.title.isValid}
            onInput={inputHandler}
            />
            
            <Input id="description"
            element="textarea"
            type="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Decription should be of atleast 10 characters"
            value={formState.inputs.description.value}
            valid={formState.inputs.title.isValid}
            onInput={inputHandler}
            />

            <Button type="submit" disabled={!formState.isValid}>Update place</Button>
        </form>
    )
}