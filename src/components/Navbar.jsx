import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, X } from "lucide-react";


const Navbar = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);

  return (
    <>
      <nav className='container h-14 md:h-16 z-20 mt-4 md:mt-8 md:px-8! fixed top-0 left-1/2 -translate-x-1/2'>
        <div className='h-full flex items-center justify-between gap-6 px-2.5 pr-6 md:px-8 shadow rounded-full border border-black/0 bg-white backdrop-blur-xs'>
          <span className='flex items-center gap-2.5 flex-1'>
            <button type='button' onClick={() => {setMenuOpen(prev => !prev)}} className='flex md:hidden bg-gray-900 text-white rounded-full p-2.5 cursor-pointer'>
              {!menuOpen ? (
                <Menu size={16} />
              ):(
                <X size={16} />
              )}
            </button>
            <Link to="/" className='font-medium text-lg'> Tilo </Link>
          </span>

          <ul className='hidden md:flex items-center gap-6 text-sm font-medium'>
            <li><Link to="/"> Home </Link></li>
            <li><Link to="/shop"> Shop </Link></li>
            <li><Link to="/contact"> Contact </Link></li>
          </ul>
          <Link to="/checkout" className='cursor-pointer relative'>
            <span className='absolute -top-2 -right-2 bg-gray-900 text-white min-w-4.5 h-4.5 p-1 flex items-center justify-center rounded-full text-xs'>
              0
            </span>
            <ShoppingBag size={22} strokeWidth={1.2} />
          </Link>

        </div>
          {menuOpen && (
            <ul className='bg-white w-full flex md:hidden flex-col items-center gap-6 text-sm font-medium p-6 pt-14 rounded-b-3xl -mt-7'>
              <li><Link onClick={() => {setMenuOpen(false)}} to="/"> Home </Link></li>
              <li><Link onClick={() => {setMenuOpen(false)}} to="/shop"> Shop </Link></li>
              <li><Link onClick={() => {setMenuOpen(false)}} to="/contact"> Contact </Link></li>
            </ul>
          )}
      </nav>

      {menuOpen && (<div onClick={() => {setMenuOpen(false)}} className='fixed z-10 bg-black/80 inset-0 w-full h-full flex md:hidden'/>)}
    </> 
  )
}

export default Navbar;