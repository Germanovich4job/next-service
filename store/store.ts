import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { productsApi } from '@/services/productsApi'

const rootReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
})

export const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']