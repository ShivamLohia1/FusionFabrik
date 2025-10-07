import React from 'react'
import Navbar from './components/Navbar'
import Products from './components/Products'

const App = () => {
  return (
    <div className='container'>
      <div className="row">
        <Navbar/>
      </div>
      <div className="row">
        <Products/>
      </div>
    </div>
  )
}

export default App