import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='container flex flex-col gap-2.5 md:gap-4 items-center justify-center py-16 bg-transparent rounded-4xl md:rounded-3xl min-h-100 lg:h-[calc(100vh-50px)] overflow-hidden! relative'>
      <div className='animate-fade-in-scale w-full h-full absolute top-0 left-0 -z-1' style={{
        backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1699697562673-c65fabd080a8?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}></div>
        <h1 className='text-xl md:text-5xl lg:text-7xl font-extrabold text-white'> Dress With Style. </h1>

        <Link to="/shop" className='btn'>
          Shop Now
        </Link>
    </section>
  )
}

export default Hero;