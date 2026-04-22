import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='py-2 px-4'>
      <div className='w-full min-h-100 lg:h-[calc(100vh-38px)] rounded-4xl md:rounded-3xl flex flex-col gap-2.5 md:gap-4 items-center justify-center overflow-hidden relative'>
        <div className='animate-fade-in-scale w-full h-full absolute top-0 left-0 -z-1' style={{
          // backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1699697562673-c65fabd080a8?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(https://plus.unsplash.com/premium_photo-1699697562673-c65fabd080a8?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          // backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(https://picsum.photos/800?random=1)',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></div>


        <span className='flex mt-4 opacity-0 text-white'>.</span>

        <h1 className='text-3xl md:text-5xl lg:text-7xl text-center font-extrabold text-white'> Ready To Wear <br/> Fashion Statements </h1>

        <Link to="/shop" className='btn'>
          Shop Now
        </Link>
      </div>
    </section>
  )
}

export default Hero;