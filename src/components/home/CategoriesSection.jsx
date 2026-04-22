import React from 'react'
import { Link } from 'react-router-dom';

const CategoriesSection = () => {
  return (
    <section className='container py-16'>
        <div className='flex flex-wrap items-center justify-between'>
          <h2 className='text-4xl font-bold mb-2'> Categories </h2>

          <Link to="/shop" className='btn btn-alt hidden md:flex'>
              Explore All
          </Link>
        </div>

        <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
          <div>
            <img src='https://picsum.photos/400/400?random=1' alt='category' className='w-full h-40 object-cover rounded-2xl' />
            <span className='text-lg font-medium mt-2 block'> Dresses </span>
          </div>
          <div>
            <img src='https://picsum.photos/400/400?random=2' alt='category' className='w-full h-40 object-cover rounded-2xl' />
            <span className='text-lg font-medium mt-2 block'> Accessories </span>
          </div>
          <div>
            <img src='https://picsum.photos/400/400?random=3' alt='category' className='w-full h-40 object-cover rounded-2xl' />
            <span className='text-lg font-medium mt-2 block'> Bags </span>
          </div>
          <div>
            <img src='https://picsum.photos/400/400?random=4' alt='category' className='w-full h-40 object-cover rounded-2xl' />
            <span className='text-lg font-medium mt-2 block'> Two Piece </span>
          </div>
        </div>        
        
    </section>
  )
}

export default CategoriesSection;