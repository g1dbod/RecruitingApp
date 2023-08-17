import { ISettings } from "../../models/ISettings"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"


const initialState: ISettings = {
  settings: {
    shedules: [],
    salary_vals: [],
    sites: [],
  }
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsSet(state, action: PayloadAction<ISettings>) {
      state.settings = action.payload.settings
    }
  }
})

export default settingsSlice.reducer;