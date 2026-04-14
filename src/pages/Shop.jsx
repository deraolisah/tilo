import React, { useState } from 'react';
import products from '../assets/data';
import ProductCard from '../components/common/ProductCard';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const categories = [
    "All Products", "Accessories", "Bags", "Bubu Gown", "Two Piece", "Salwar Set", "Dresses"
  ]

  return (
    <div className='container'>
      <h2 className='text-3xl font-semibold '> All Products </h2>

      <div className='flex items-center gap-1.5 flex-wrap mt-4'>
        {categories.map((category, index) => (
          <span key={index} className={`border border-gray-900 hover:border-gray-600 hover:text-gray-600 rounded-full p-2 px-4 text-xs md:text-sm text-nowrap cursor-pointer ${activeCategory === category ? "bg-gray-900 text-white hover:bg-gray-800 hover:text-white" : ""}`} onClick={() => {setActiveCategory(category)}} title={category}>
            {category}
          </span>
        ))}
      </div>

      <div className='grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 py-6 mb-12'>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Shop;