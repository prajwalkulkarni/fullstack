import styles from './NewPLace.module.css'
import Input from '../../shared/FormElements/Input'
import { useCallback,useReducer } from 'react'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import Button from '../../shared/FormElements/Button'
const formReducer = (state,action)=>{

    switch(action.type){

        case "INPUT_CHANGE":
            let formIsValid = true
            
            for(const inputId in state.inputs){

                if(inputId===action.inputId){
                    formIsValid = formIsValid && action.isValid
                }
                else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }

            console.log({
                ...state,
                inputs:{...state.inputs,
                [action.inputId]:{value:action.value,isValid:action.isValid}
                },
                isValid:formIsValid
            })

            return {
                ...state,
                inputs:{...state.inputs,
                [action.inputId]:{value:action.value,isValid:action.isValid}
                },
                isValid:formIsValid
            }
        default:
            return state
    }
}
export default function NewPlaces(props){


    const [formState,dispatchFn]=useReducer(formReducer,{
        inputs:{
            title:{
                value:'',
                isValid:false
            },
            description:{
                value:'',
                isValid:false
            },
            
        },
        isValid:false
    })

    const inputHandler = useCallback((id,inputValue,isValid) =>{
        
        dispatchFn({type:"INPUT_CHANGE",value:inputValue,inputId:id,isValid})
    },[])

    

    return (
        <form className={styles['place-form']}>

            <Input id="title" type="text" label="Title" element="input"
            errorText="Please enter a valid input" 
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}/>
            
            <Input id="description" type="textarea" label="Description" 
            errorText="Description should be of atleast 10 characters." 
            validators={[VALIDATOR_MINLENGTH(10)]}
            onInput={inputHandler}/>

            <Button type="submit" disabled={!formState.isValid}>Add place</Button>
            
        </form>
    )
}