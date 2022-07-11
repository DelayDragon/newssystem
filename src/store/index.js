import { configureStore } from "@reduxjs/toolkit"
import collapsedState from "./modules/collapsedState"
import loadingState from "./modules/loadingState"

// 创建store
export const store = configureStore({
    reducer: {
        collapsedS: collapsedState,
        spinning: loadingState
    }
})