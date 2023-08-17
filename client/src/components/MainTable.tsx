import React from 'react'
import Pager from './Pager'
import Table from './Table'
import './MainTable.scss'

const MainTable = () => {
  return (
    <div className='MainTable'>
      <Table/>
      <Pager/>
    </div>
  )
}

export default MainTable