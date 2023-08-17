import { IFilterList, IFilter } from "../../models/IFilters"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: IFilterList = {
  page: 1,
  filters: {
    site: "ALL",
    name: "",
    area: "",
    salary_from: "",
    salary_to: "",
    salary_val: "",
    created_at: "",
    archived: "ALL",
    shedule: "ALL",
    order: {
      column: "name",
      type: "ASC"
    }
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterSet(state, action: PayloadAction<IFilter>) {
      state.filters = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setSite(state, action: PayloadAction<String>) {
      state.filters.site = action.payload
      state.page = 1
    },
    setName(state, action: PayloadAction<String>) {
      state.filters.name = action.payload
      state.page = 1
    },
    setArea(state, action: PayloadAction<String>) {
      state.filters.area = action.payload
      state.page = 1
    },
    setSalaryFrom(state, action: PayloadAction<String>) {
      state.filters.salary_from = action.payload
      state.page = 1
    },
    setSalaryTo(state, action: PayloadAction<String>) {
      state.filters.salary_to = action.payload
      state.page = 1
    },
    setSalaryVal(state, action: PayloadAction<String>) {
      state.filters.salary_val = action.payload
      state.page = 1
    },
    setCreatesAt(state, action: PayloadAction<String>) {
      state.filters.created_at = action.payload
      state.page = 1
    },
    setArchived(state, action: PayloadAction<String>) {
      state.filters.archived = action.payload
      state.page = 1
    },
    setShedule(state, action: PayloadAction<String>) {
      state.filters.shedule = action.payload
      state.page = 1
    },
    setColumn(state, action: PayloadAction<String>) {
      state.filters.order.column = action.payload
      state.page = 1
    },
    setType(state, action: PayloadAction<String>) {
      state.filters.order.type = action.payload
      state.page = 1
    }
  }
})

export default filterSlice.reducer;