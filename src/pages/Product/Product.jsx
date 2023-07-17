import React from 'react'
import ResultProducts from '../../components/ResultProducts/ResultProducts'
import Navbar from '../../components/Navbar'

const Product = () => {
  return (
    <div className="section-container">
      <div className="content">
        <Navbar />
        <ResultProducts />
      </div>
    </div>
  )
}

export default Product