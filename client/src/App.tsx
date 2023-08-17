import React from 'react'
import Header from './components/Header'
import MainTable from './components/MainTable'
import Statistic from './components/Statistic'
import './App.scss'

const App = () => {
  return (
    <div className='App'>
      <Header/>
      <MainTable/>
      <Statistic/>
    </div>
  )
}

export default App
