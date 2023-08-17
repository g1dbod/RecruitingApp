import axios from 'axios'
import { AppDispatch } from '../store/store'
import { ISettings } from "../models/ISettings"
import { settingsSlice } from '../store/reducers/SettingsSlice'
import { dataSlice } from '../store/reducers/DataSlice'
import { IDataList } from '../models/IData'
import { IFilterList } from '../models/IFilters'
import {API_URL} from '../config'


export const getData =  (filterList: IFilterList) => async (dispatch: AppDispatch) => {
  try{
    const response = await axios.get<IDataList>(`${API_URL}api/getData`, {
      params: {
        ...filterList
      }
    })
    dispatch(dataSlice.actions.dataSet(response.data))
  } catch (e){
    console.log("Error Data", e)
  }
}

export const getSettings =  () => async (dispatch:AppDispatch) => {
  try{
    const response = await axios.get<ISettings>(`${API_URL}api/getSettings`)
    dispatch(settingsSlice.actions.settingsSet(response.data))
  } catch (e){
    console.log("Error Settings", e)
  }
}