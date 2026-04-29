import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Logo from "../../assets/logo.png";
import SearchBar from "./SearchBar.jsx";

const Navbar = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const toggleSearchBar = () => {
    setSearchOpen(!searchOpen);
    console.log("Search Button Was Clicked!");
  };

  const navList = [
    {link: "Home", href: "/" },
    {link: "Shop", href: "/shop" },
    {link: "About", href: "/about" },
    {link: "Contact", href: "/contact" },
  ]

  const handleScroll = () => {
    if (window.scrollY > 80) {
      setSticky(true);
    }
    else {
      setSticky(false);
    }
  }

  // React.useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   }
  // }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  
  return (
    <>
      <nav className='container h-14 md:h-16 z-20! mt-4 md:mt-8 fixed top-0 left-1/2 -translate-x-1/2'>
        {!searchOpen ? (
          <div className={`h-full flex items-center justify-between gap-4 md:gap-6 px-2.5 pr-6 md:px-8 shadow rounded-full border border-black/0 bg-white backdrop-blur-sm z-4000! transition-all duration-500 ${sticky ? "transition-all duration-500 md:shadow-lg md:justify-center md:w-fit mx-auto" : ""}`}>
            <span className='flex items-center justify-start gap-2.5 w-full'>
              <button type='button' onClick={() => {setMenuOpen(prev => !prev)}} className='flex md:hidden bg-gray-900 text-white rounded-full p-2.5 cursor-pointer z-30'>
                {!menuOpen ? (
                  <Menu size={16} />
                ):(
                  <X size={16} />
                )}
              </button>
              <Link to="/" className='font-bold text-xl flex gap-2 items-center'>  
                <img src={Logo} alt='' className='h-6 w-6 object-cover' /> 
                {/* Tilo Store */}
              </Link>
            </span>

            <ul className='hidden md:flex items-center justify-center gap-6 text-sm font-medium w-full'>
              {navList.map((item, index) => (
                <li key={index}>
                  <NavLink onClick={() => { scrollTo(0,0); }} to={item.href} end className={({isActive}) =>  `hover:text-gray-600 ${isActive ? "text-red-500 underline hover:text-red-500" : ""}`}> {item.link} </NavLink>
                </li>
              ))}
            </ul>

            <div className='flex items-center justify-end gap-4 w-full'>
              <button onClick={() => {toggleSearchBar(); setMenuOpen(false);}} type="button" className='cursor-pointer ml-2' title='Search'>
                <Search size={22} strokeWidth={1.2} />
              </button>

              <Link to="/checkout" className='cursor-pointer relative' onClick={() => { setMenuOpen(false); scrollTo(0,0); }} title='Cart'>
                <span className='absolute -top-2 -right-2 bg-gray-900 text-white min-w-4.5 h-4.5 p-1 flex items-center justify-center rounded-full text-xs'>
                  0
                </span>
                <ShoppingBag size={22} strokeWidth={1.2} />
              </Link>
            </div>
          </div>
        ) : (
          <SearchBar toggleSearchBar={toggleSearchBar} setSearchOpen={setSearchOpen} />
        )}

        
        <ul className={`bg-white w-full flex md:hidden flex-col items-center gap-6 text-sm font-medium rounded-b-3xl -mt-7 p-6 pt-14 transition-all duration-500 overflow-hidden -z-1! relative ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-10 pointer-events-none"}`}>
          {navList.map((item, index) => (
            <li key={index}>
              <NavLink
                onClick={() => {setMenuOpen(false); scrollTo(0,0); }} 
                to={item.href}
                end
                className={({isActive}) =>  `hover:text-gray-600 ${isActive ? "text-red-500 underline hover:text-red-500" : ""}`}> {item.link} </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {searchOpen && (<div onClick={() => {setSearchOpen(false)}} className='fixed z-10 bg-black/60 inset-0 w-full h-full flex'/>)}

      {menuOpen && (<div onClick={() => {setMenuOpen(false)}} className='fixed z-10 bg-black/60 inset-0 w-full h-full flex md:hidden'/>)}
    </> 
  )
}

export default Navbar;