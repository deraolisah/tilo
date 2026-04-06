import React from 'react'
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const CategoriesSection = () => {
  return (
    <section className='container px-0! py-16'>
        <div className='flex items-center justify-between'>
            <h2 className=''> Categories </h2>

            <Link to="/shop" className='btn btn-alt'>
                Explore All
            </Link>
        </div>

        <div>
          <ProductCard />

        </div>        
        
    </section>
  )
}

export default CategoriesSection;