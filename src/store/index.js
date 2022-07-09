import { configureStore } from "@reduxjs/toolkit"
import collapsedState from "./modules/collapsedState"

// 创建store
export const store= configureStore({
    reducer:{
        collapsedState
    }
})