import React from 'react'
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className='container py-16 text-center'>
        <h2 className='text-4xl font-bold mb-2'> Our story </h2>
        <p className='max-w-3xl mx-auto font-light text-lg'>
          We believe fashion should feel good — on your body and in the eyes of on-lookers. Our brand was created to challenge the fast-fashion cycle and offer thoughtfully designed pieces that last beyond... <br/><Link to="/about" className='inline-block hover:text-gray-200 underline text-sm' onClick={() => { scrollTo(0,0); }}> Read more </Link>
        </p>

        
    </section>
  )
}

export default AboutSection;