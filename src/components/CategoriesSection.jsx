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

        <div className='w-full grid grid-cols-3 gap-4'>
          <div>
            Dresses
          </div>
          <div>
            Accessories
          </div>
          <div>
            Dresses
          </div>
        </div>        
        
    </section>
  )
}

export default CategoriesSection;