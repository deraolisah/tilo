import React from 'react'

const Shop = () => {
  return (
    <div className='container'>
      <h2 className='text-3xl font-semibold '> All Products </h2>

      <div className='flex items-center gap-x-2 gap-y-1 flex-wrap mt-4'>
        <span className='bg-gray-900 text-white border border-gray-900 rounded-full p-2 px-4 text-sm text-nowrap'> All Products </span>
        <span className='border border-gray-900 rounded-full p-2 px-4 text-sm text-nowrap'> Accessories </span>
        <span className='border border-gray-900 rounded-full p-2 px-4 text-sm text-nowrap'> Bags </span>
        <span className='border border-gray-900 rounded-full p-2 px-4 text-sm text-nowrap'> Bubu Gown </span>
        <span className='border border-gray-900 rounded-full p-2 px-4 text-sm text-nowrap'> Two Piece </span>
        <span className='border border-gray-900 rounded-full p-2 px-4 text-sm text-nowrap'> Salwar Set </span>
        <span className='border border-gray-900 rounded-full p-2 px-4 text-sm text-nowrap'> Dresses </span>
      </div>
    </div>
  )
}

export default Shop;