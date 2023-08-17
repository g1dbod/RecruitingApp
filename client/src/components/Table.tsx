import React, { useEffect } from 'react'
import { getData, getSettings } from '../actions'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IFilterList } from '../models/IFilters'
import { filterSlice } from '../store/reducers/FilterSlice'
import './Table.scss'

const Table = () => {
  const dispatch = useAppDispatch()
  const { settings } = useAppSelector(state => state.settingsReducer)
  const { data } = useAppSelector(state => state.dataReducer)
  const { page, filters } = useAppSelector(state => state.filterReducer)

  useEffect(() => {
    dispatch(getSettings())
    dispatch(getData({ page, filters }))
  }, [page, filters])

  return (
    <table className='Table'>
      <thead>
        <tr className="head row">
          <td className="col">#</td>
          <td className="col">Сайт</td>
          <td className="col">Специальность</td>
          <td className="col">Город</td>
          <td className="col">Мин. ЗП</td>
          <td className="col">Макс. ЗП</td>
          <td className="col">Валюта</td>
          <td className="col">Дата Создания</td>
          <td className="col">В архиве?</td>
          <td className="col">Режим</td>
          <td className="col">URL</td>
        </tr>
      </thead>

      <tbody>
        <tr className="body filters row">
          <td className="col"> </td>
          <td className="col">
            <select onChange={(event)=>{
              dispatch(filterSlice.actions.setSite(event.target.value))
            }}>
              <option value={'ALL'}>ALL</option>
              {
                settings.sites.map((item, i) => {
                  return (
                    <option value={`${item.site}`}>{item.site}</option>
                  )
                })
              }
            </select>
          </td>
          <td className="col">
            <input type="text" placeholder='name' onChange={(event)=>{
              // console.log(event.target.value)
              dispatch(filterSlice.actions.setName(event.target.value))
            }}/>
          </td>
          <td className="col">
            <input type="text" placeholder='area' onChange={(event)=>{
              dispatch(filterSlice.actions.setArea(event.target.value))
            }}/>
          </td>
          <td className="col">
            <input type="text" placeholder='salary_from' onChange={(event)=>{
              dispatch(filterSlice.actions.setSalaryFrom(event.target.value))
            }}/>
          </td>
          <td className="col">
            <input type="text" placeholder='salary_to' onChange={(event)=>{
              dispatch(filterSlice.actions.setSalaryTo(event.target.value))
            }}/>
          </td>
          <td className="col">
            <select onChange={(event)=>{
              dispatch(filterSlice.actions.setSalaryVal(event.target.value))
            }}>
              <option value={'ALL'}>ALL</option>
              {
                settings.salary_vals.map((item, i) => {
                  return (
                    <option value={`${item.salary_val}`}>{item.salary_val}</option>
                  )
                })
              }
            </select>
          </td>
          <td className="col">
            <input type="date" onChange={(event)=>{
              // console.log(event.target.value)
              dispatch(filterSlice.actions.setCreatesAt(event.target.value))
            }}/>
          </td>
          <td className="col">
            <select onChange={(event)=>{
              dispatch(filterSlice.actions.setArchived(event.target.value))
            }}>
              <option value={'ALL'}>ALL</option>
              <option value={'true'}>true</option>
              <option value={'false'}>false</option>
            </select>
          </td>
          <td className="col">
            <select onChange={(event)=>{
              dispatch(filterSlice.actions.setShedule(event.target.value))
            }}>
              <option value={'ALL'}>ALL</option>
              {
                settings.shedules.map((item, i) => {
                  return (
                    <option value={`${item.shedule}`}>{item.shedule}</option>
                  )
                })
              }
            </select></td>
          <td className="col"> </td>
        </tr>
        {
          data.rows.map((item, i) => {
            return (
              <tr className="body row">
                <td className="col">{(page - 1) * 20 + i + 1}</td>
                <td className="col">{item.site}</td>
                <td className="col name" data-title={item.name}>{item.name}</td>
                <td className="col">{item.area}</td>
                <td className="col">{item.salary_from}</td>
                <td className="col">{item.salary_to}</td>
                <td className="col">{item.salary_val}</td>
                <td className="col">{item.created_at}</td>
                <td className="col">{String(item.archived)}</td>
                <td className="col">{item.shedule}</td>
                <td className="col">
                  <a href={`${item.alternate_url}`}>@</a>
                </td>
              </tr>
            )
          })
        }
      </tbody>

    </table>
  )
}

export default Table