import React from 'react'
import { filterSlice } from '../store/reducers/FilterSlice'
import { useAppDispatch, useAppSelector } from '../hooks/redux'


const Header = () => {
  const dispatch = useAppDispatch()

  return (
    <div className='Header'>
      <div className='wrapper'>
        <div className="logo">Analizer</div>
        <div className="sorted">
          <div className="name">Сортировка:</div>
          <select onChange={(event)=>{
              dispatch(filterSlice.actions.setColumn(event.target.value))
            }} >
            <option value={'name'}>name</option>
            <option value={'area'}>area</option>
            <option value={'salary_from'}>salary_from</option>
            <option value={'salary_to'}>salary_to</option>
            <option value={'salary_val'}>salary_val</option>
            <option value={'created_at'}>created_at</option>
            <option value={'archived'}>archived</option>
            <option value={'shedule'}>shedule</option>
          </select>
          <select onChange={(event)=>{
              dispatch(filterSlice.actions.setType(event.target.value))
            }} >
            <option value={'ASC'}>по возрастанию</option>
            <option value={'DESC'}>по убыванию</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Header