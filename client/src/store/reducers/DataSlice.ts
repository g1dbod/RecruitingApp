import { IDataList } from "../../models/IData"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: IDataList = {
  data: {
    count: 0,
    rows: [
      {
        site: "ALL",
        name: "",
        area: "",
        salary_from: "",
        salary_to: "",
        salary_val: "",
        created_at: "",
        archived: "ALL",
        shedule: "ALL",
        alternate_url: ""
      }
    ],
    salary: {
      salary_from: {
        min: 0,
        max: 0
      },
      salary_to: {
        min: 0,
        max: 0
      }
    }
  }
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    dataSet(state, action: PayloadAction<IDataList>) {
      state.data = action.payload.data
    }
  }
})

export default dataSlice.reducer;