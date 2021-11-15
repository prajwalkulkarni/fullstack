import {createSlice,configureStore} from '@reduxjs/toolkit'



const authSlice = createSlice({
    name:'Authslice',
    initialState:{
        isLoggedIn:false
    },
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true
        },
        logout:(state,action)=>{
            console.log("Logout triggered")
            state.isLoggedIn = false
        }
    }
})

export const authActions = authSlice.actions

const store = configureStore({
    name:'authstore',
    reducer:authSlice.reducer
})

export default store