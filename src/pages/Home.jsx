import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedSection from '../components/FeaturedSection';

const Home = () => {
  return (
    <section className='-mt-22 md:-mt-28'>
      <Hero />
      <AboutSection />
      <CategoriesSection />
      <FeaturedSection />
    </section>
  )
}

export default Home;