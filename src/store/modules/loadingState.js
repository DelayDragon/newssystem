import { createSlice } from "@reduxjs/toolkit";

const loadingState = createSlice({
    name: 'spinning',
    initialState: {
        spinning: false
    },
    reducers: {
        changeSpinning: (state, action) => {
            console.log(state, action);
            state.spinning = !state.spinning
        }
    }
})

export const { changeSpinning } = loadingState.actions
console.log(loadingState);

export default loadingState.reducer