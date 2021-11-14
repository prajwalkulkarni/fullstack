import { useReducer,useCallback } from "react";


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

            // console.log({
            //     ...state,
            //     inputs:{...state.inputs,
            //     [action.inputId]:{value:action.value,isValid:action.isValid}
            //     },
            //     isValid:formIsValid
            // })

            return {
                ...state,
                inputs:{...state.inputs,
                [action.inputId]:{value:action.value,isValid:action.isValid}
                },
                isValid:formIsValid
            }
        
        case "SET_DATA":
            return {
                inputs:action.inputs,
                isValid:action.formIsValid
            }

        default:
            return state
    }
}

export function useForm(initialInputs,initialValidity){

    const [formState,dispatchFn]=useReducer(formReducer,{
        inputs:initialInputs,
        isValid:initialValidity
    })

    const inputHandler = useCallback((id,inputValue,isValid) =>{
        
        dispatchFn({type:"INPUT_CHANGE",value:inputValue,inputId:id,isValid})
    },[])


    const setFormData = useCallback((inputData, formValidity)=>{
        dispatchFn({
            type:"SET_DATA",
            inputs: inputData,
            formIsValid:formValidity
        })
    })
    return {formState,inputHandler,setFormData}

}