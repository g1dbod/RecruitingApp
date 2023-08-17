export interface IFilterList {
  page: number,
  filters: IFilter
}

export interface IFilter {
  site: String,
  name: String,
  area: String,
  salary_from: String,
  salary_to: String,
  salary_val: String,
  created_at: String,
  archived: String,
  shedule: String,
  order: {
    column: String,
    type: String
  }
}
