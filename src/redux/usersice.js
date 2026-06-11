import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
    name:"user",
    initialState:{
       userData:null,
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
        updateCredits:(state,action)=>{
            if(state.userData){
                state.userData.credits = action.payload
            }
        }
    }
})
export const {setUserData ,updateCredits}=userslice.actions
export default userslice.reducer