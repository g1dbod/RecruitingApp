import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

const Statistic = () => {
  const { data } = useAppSelector(state => state.dataReducer)

  return (
    <div className='Statistic'>
      <div className="wrapper">
        <div className="count_block">
          <h3>Количество записей: {data.count}</h3>
        </div>
        <div className="salary_block">
          <div className="salary from">
            <h3>Мин. зп.</h3>
            <div className="min">min: {data.salary.salary_from.min}</div>
            <div className="avg">avg: {(data.salary.salary_from.min + data.salary.salary_from.max) / 2}</div>
            <div className="max">max: {data.salary.salary_from.max}</div>
          </div>
          <div className="salary to">
            <h3>Макс. зп.</h3>
            <div className="min">min: {data.salary.salary_to.min}</div>
            <div className="avg">avg: {(data.salary.salary_to.min + data.salary.salary_to.max) / 2}</div>
            <div className="max">max: {data.salary.salary_to.max}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistic