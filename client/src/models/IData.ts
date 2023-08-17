export interface IData {
  site: String,
  name: String,
  area: String,
  salary_from: String,
  salary_to: String,
  salary_val: String,
  created_at: String,
  archived: String,
  shedule: String,
  alternate_url: String
}

export interface IDataList {
  data: {
    count: number,
    rows: IData[],
    salary: {
      salary_from: {
        min: number,
        max: number
      },
      salary_to: {
        min: number,
        max: number
      }
    }
  }
}