import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedSection = () => {
  return (
    <section className='container py-16'>
      <div className='flex flex-wrap items-center justify-between'>
        <h2 className='text-4xl font-bold mb-2'> Featured </h2>

        <Link to="/shop" className='btn btn-alt hidden md:flex'>
            Explore All
        </Link>
      </div>
      
    </section>
  )
}

export default FeaturedSection;