import styles from './Input.module.css'
import {useReducer} from 'react'


const reducer = (state,action)=>{

    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid:true
            }
        default:
            return state
    }
}

export default function Input(props){

    
    const [inputState,dispatchFn] = useReducer(reducer,{value:'',isValid:false})

    const changeHandler = e =>{
        dispatchFn({type:'CHANGE',val:e.target.value})

    }

    const element = props.element === 'input' ?( <input id={props.id} placeholder={props.placeholder} 
        onChange={changeHandler}
        value={inputState.value}/>)
    :(<textarea id={props.id} rows={props.wors || 3} 
        onChange={changeHandler}
        value={inputState.value}/>)
    return(
        <div className={[styles['form-control'],styles[`${!inputState.isValid && 'form-control--invalid'}`]].join(' ')}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            {element}
            {!inputState.isValid && <p>{props.errorText}</p>}
            
        </div>
    )
}