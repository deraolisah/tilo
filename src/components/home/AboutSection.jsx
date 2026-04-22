import React from 'react'
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className='container py-16 text-center'>
        <h2 className='text-2xl md:text-4xl font-semibold mb-2.5'> Designed for You </h2>
        <p className='max-w-3xl mx-auto font-light text-base md:text-xl'>
          Every outfit you wear should say something without you having to speak. From bold statements to everyday elegance, you get pieces that elevate your style, boost your confidence, and make sure all eyes are exactly where they should be… <Link to="/about" className='inline-block hover:text-gray-600 underline' onClick={() => { scrollTo(0,0); }}> Read more </Link>
        </p>

        
    </section>
  )
}

export default AboutSection;