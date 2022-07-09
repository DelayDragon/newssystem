import { createSlice } from "@reduxjs/toolkit";

const collapsedState = createSlice({
    name:'collapseder',
    initialState:{
        collapsed:false
    },
    reduers:{
        changeCollapsed(state,action){
            console.log(state,action);
            state.collapsed = !state.collapsed
        }
    }
})

export const  {changeCollapsed} = collapsedState.actions

export default collapsedState.reducer