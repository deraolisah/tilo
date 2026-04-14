import React from 'react';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedSection from '../components/home/FeaturedSection';

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