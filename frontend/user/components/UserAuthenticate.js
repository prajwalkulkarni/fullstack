import { useState } from "react";
import Button from "../../shared/FormElements/Button";
import Input from "../../shared/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/UIElements/Card";
import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import styles from './UserAuthenticate.module.css'
import {useDispatch} from 'react-redux'
import {authActions} from '../../store/auth-store'
export default function UserAuthenticate(props){
    const dispatch = useDispatch()
    const [isLogin,setIsLogin] = useState(true)
    const {formState,inputHandler,setFormData} = useForm({
        
            email:{
                value:'',
                isValid:false
            },
            password:{
                value:'',
                isValid:false
            }
        
    },false)

    const submitFormHandler = e =>{
        e.preventDefault()

        dispatch(authActions.login())
    }

    const switchModeHandler = () =>{

        if(!isLogin){
            setFormData({
                name:undefined
            },
                formState.inputs.email.isValid&&formState.inputs.password.isValid)
        }
        else{
            setFormData({
                ...formState.inputs,
                name:{
                    value:'',
                    isValid:false
                }
            },false)
        }
        setIsLogin(p=>!p)
    }

    return(
        <Card className={styles['authentication']}>
            <h2>Login required</h2>
            <hr/>
            <form onSubmit={submitFormHandler}>
                {!isLogin &&
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your name"
                        onInput={inputHandler} />
                }


                <Input errorText="Invalid email ID"
                    label="E-mail"
                    type="email"
                    element="input"
                    id="email"
                    onInput={inputHandler}
                    validators={[VALIDATOR_EMAIL()]} />

                <Input errorText="Password needs to be atleast 7 characters"
                    label="Password"
                    type="password"
                    element="input"
                    id="password"
                    onInput={inputHandler}
                    validators={[VALIDATOR_MINLENGTH(7), VALIDATOR_REQUIRE()]} />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLogin?'Login':'Signup'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>Switch to {isLogin?'Signup':'Login'}</Button>
        </Card>
    )

}