import { configureStore } from "@reduxjs/toolkit"
import collapsedState from "./modules/collapsedState"
import loadingState from "./modules/loadingState"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
  }
  
// const persistedReducer = persistReducer(persistConfig, store.reducers)

// 创建store
export const store = configureStore({
    reducer: {
        collapsedS: collapsedState,
        spinning: loadingState
    }
})