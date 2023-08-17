import { configureStore, combineReducers } from '@reduxjs/toolkit'
import settingsReducer from './reducers/SettingsSlice'
import dataReducer from './reducers/DataSlice'
import filterReducer from './reducers/FilterSlice'

const rootReducer = combineReducers({
  settingsReducer,
  dataReducer,
  filterReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
