import { createSlice } from "@reduxjs/toolkit";

const collapsedState = createSlice({
    name: 'collapsedS',
    initialState: {
        collapsed: false
    },
    reducers: {
        changeCollapsed: (state, action) => {
            console.log(state, action);
            state.collapsed = !state.collapsed
        }
    }
})

export const { changeCollapsed } = collapsedState.actions
console.log(collapsedState);

export default collapsedState.reducer