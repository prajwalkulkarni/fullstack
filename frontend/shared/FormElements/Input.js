import styles from './Input.module.css'
import {useEffect, useReducer} from 'react'
import { validate } from '../../shared/utils/validators'

const reducer = (state,action)=>{

    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid:validate(action.val,action.validators)
            }
        case 'TOUCH':
            return{
                ...state,
                isTouched:true
            }
        default:
            return state
    }
}

export default function Input(props){

    
    const [inputState,dispatchFn] = useReducer(reducer,{value:props.value||'',isValid:props.valid||false,isTouched:false})

    const changeHandler = e =>{
        dispatchFn({type:'CHANGE',val:e.target.value,validators:props.validators})

    }

    const touchHandler = e =>{
        dispatchFn({type:'TOUCH'})
    }

    useEffect(()=>{
        props.onInput(props.id,inputState.value,inputState.isValid)
    },[inputState.value,props.onInput,inputState.isValid])

    const element = props.element === 'input' ?( <input id={props.id} placeholder={props.placeholder} 
        onChange={changeHandler}
        type={props.type}
        value={inputState.value}
        onBlur={touchHandler}/>)
    :(<textarea id={props.id} rows={props.wors || 3} 
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}/>)
    return(
        <div className={[styles['form-control'],styles[`${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`]].join(' ')}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
            
        </div>
    )
}