import React from 'react'

const Cart = () => {
  return (
    <div className='container bg-white p-4'>
      <h2 className='text-3xl font-semibold '> My CArt </h2>
      <p>
        Your Cart is Empty
      </p>

      <button className='btn'>
        Shop Now
      </button>
    </div>
  )
}

export default Cart;