import Button from "../../shared/FormElements/Button"
import Input from "../../shared/FormElements/Input"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators"

export default function UpdatePlace(props){

    if(!props.placeToBeUpdated){
        return(
            <div>
                <h1>Place not found</h1>
            </div>
        )
    }

    return (
        <form>
            <Input id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            value={props.placeToBeUpdated.title}
            valid={true}
            />
            
            <Input id="description"
            element="textarea"
            type="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Decription should be of atleast 10 characters"
            value={props.placeToBeUpdated.description}
            valid={true}
            />

            <Button disabled={true}>Update place</Button>
        </form>
    )
}