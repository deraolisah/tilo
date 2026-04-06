import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, X } from "lucide-react";
import Logo from "../assets/logo.png";


const Navbar = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);

  return (
    <>
      <nav className='container h-14 md:h-16 z-20! mt-4 md:mt-8 fixed top-0 left-1/2 -translate-x-1/2'>
        <div className='h-full flex items-center justify-between gap-6 px-2.5 pr-6 md:px-8 shadow rounded-full border border-black/0 
        bg-white backdrop-blur-xs z-4000!'>
          <span className='flex items-center gap-2.5 flex-1'>
            <button type='button' onClick={() => {setMenuOpen(prev => !prev)}} className='flex md:hidden bg-gray-900 text-white rounded-full p-2.5 cursor-pointer z-30'>
              {!menuOpen ? (
                <Menu size={16} />
              ):(
                <X size={16} />
              )}
            </button>
            <Link to="/" className='font-medium text-xl flex gap-2 items-center'>  
              <img src={Logo} alt='' className='h-6 w-6 object-cover' /> 
              {/* Tilo */}
            </Link>
          </span>

          <ul className='hidden md:flex items-center gap-6 text-sm font-medium'>
            <li><Link to="/" className='hover:text-gray-300'> Home </Link></li>
            <li><Link to="/shop" className='hover:text-gray-300'> Shop </Link></li>
            <li><Link to="/about" className='hover:text-gray-300'> About </Link></li>
            <li><Link to="/contact" className='hover:text-gray-300'> Contact </Link></li>
          </ul>
          <Link to="/checkout" className='cursor-pointer relative ml-2' onClick={() => { setMenuOpen(false) }}>
            <span className='absolute -top-2 -right-2 bg-gray-900 text-white min-w-4.5 h-4.5 p-1 flex items-center justify-center rounded-full text-xs'>
              0
            </span>
            <ShoppingBag size={22} strokeWidth={1.2} />
          </Link>

        </div>

        <ul className={`bg-white w-full flex md:hidden flex-col items-center gap-6 text-sm font-medium rounded-b-3xl -mt-7 p-6 pt-14 transition-all duration-500 overflow-hidden -z-1! relative ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <li><Link onClick={() => {setMenuOpen(false); scrollTo(0,0); }} to="/"> Home </Link></li>
          <li><Link onClick={() => {setMenuOpen(false); scrollTo(0,0); }} to="/shop"> Shop </Link></li>
          <li><Link onClick={() => {setMenuOpen(false); scrollTo(0,0); }} to="/about"> About </Link></li>
          <li><Link onClick={() => {setMenuOpen(false); scrollTo(0,0); }} to="/contact"> Contact </Link></li>
        </ul>
      </nav>

      {menuOpen && (<div onClick={() => {setMenuOpen(false)}} className='fixed z-10 bg-black/60 inset-0 w-full h-full flex md:hidden'/>)}
    </> 
  )
}

export default Navbar;