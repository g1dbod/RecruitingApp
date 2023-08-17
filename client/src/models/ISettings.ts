interface IShedule{
  shedule: String;
}

interface ISalary_vals{
  salary_val: String;
}

interface ISites{
  site: String;
}

export interface ISettings {
  settings: {
    shedules: IShedule[];
    salary_vals: ISalary_vals[];
    sites: ISites[];
  }
}
