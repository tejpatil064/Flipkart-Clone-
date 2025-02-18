import React from 'react'
import SellerHeader from '../components/SellerHeader'
import ProductList from '../pages/ProductList'
import Footer from '../components/Footer'

export const SellerHomePage = () => {
  return (
    <div>
        <SellerHeader/>
        <ProductList/>
        <Footer/>
    </div>
  )
}
