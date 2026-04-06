import React from 'react'
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className='container py-16 text-center'>
        <h2> Our story </h2>
        <p>
          We believe fashion should feel good — on your body and on the planet.Our brand was created to challenge the fast-fashion cycle and offer thoughtfully designed pieces that last beyond... <Link to="/about" className='inline-block text-gray-600 underline text-sm' onClick={() => { scrollTo(0,0); }}> Read more </Link>
        </p>

        
    </section>
  )
}

export default AboutSection;