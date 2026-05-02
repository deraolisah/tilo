import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Logo from "../../assets/logo.png";
import SearchBar from "./SearchBar.jsx";
import Cart from './Cart.jsx';
import Login from './Login.jsx';
import useAuthStore from '../../store/useAuthStore.js';

const Navbar = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // const user = useAuthStore((state) => state.user);
  


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
          <div className={`h-full flex items-center justify-between gap-4 md:gap-6 px-2.5 md:pr-4! md:px-8 shadow rounded-full border border-black/0 bg-white backdrop-blur-sm z-4000! transition-all duration-500 `}>
            {/* ${sticky ? "transition-all duration-500 md:shadow-lg md:justify-center md:w-fit mx-auto" : ""} */}
            <span className='flex items-center justify-start gap-2.5 w-full'>
              <button type='button' onClick={() => {setMenuOpen(prev => !prev)}} className='flex md:hidden bg-gray-900 text-white rounded-full p-2.5 cursor-pointer z-30'>
                {!menuOpen ? (
                  <Menu size={16} />
                ):(
                  <X size={16} />
                )}
              </button>
              <Link to="/" className='flex gap-2 items-center'>  
                <img src={Logo} alt='' className='h-6 w-6 object-cover' /> 
              </Link>
            </span>

            <ul className='hidden md:flex items-center justify-center gap-6 text-sm font-medium w-full'>
              {navList.map((item, index) => (
                <li key={index}>
                  <NavLink onClick={() => { scrollTo(0,0); }} to={item.href} end className={({isActive}) =>  `hover:text-gray-600 ${isActive ? "text-red-500 underline hover:text-red-500" : ""}`}> {item.link} </NavLink>
                </li>
              ))}
            </ul>

            <div className='flex items-center justify-end gap-1 w-full'>
              <button
               onClick={() => {
                toggleSearchBar(); 
                setMenuOpen(false);
                setCartOpen(false);
                setAccountOpen(false);
                }} 
                type="button" 
                className='cursor-pointer ml-2 p-1 rounded-full hover:bg-gray-100' title='Search'>
                <Search size={22} strokeWidth={1.2} />
              </button>

              <div className='relative flex items-center'>
                <button
                  className={`cursor-pointer relative p-1.5 rounded-full hover:bg-gray-100 ${cartOpen ? "bg-gray-100": "bg-transparent"}`}
                  onClick={() => {
                    setCartOpen(true);
                    setAccountOpen(false); 
                    setMenuOpen(false);
                  }}
                  title="Cart"
                >
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white min-w-4 h-4 p-0.5 flex items-center justify-center rounded-full text-xs">
                    0
                  </span>
                  <ShoppingBag size={22} strokeWidth={1.2} />
                </button>
                {cartOpen && (
                  <div className="fixed top-12 md:top-14 right-0 md:right-2 z-40 w-full md:max-w-115 p-4 md:px-0">
                    <Cart />
                  </div>
                )}
              </div>

              <div className='relative flex items-center'>
                <button
                  className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 ${accountOpen ? "bg-gray-100": "bg-transparent"}`}
                  onClick={() => {
                    setAccountOpen(true);
                    setCartOpen(false); 
                    setMenuOpen(false);
                  }}
                  title="Account"
                  >
                  <User size={22} strokeWidth={1.2} />
                </button>
                {accountOpen && (
                  <div className="fixed top-12 md:top-14 right-0 md:right-2 z-40 w-full md:max-w-115 p-4 md:px-0">
                    {useAuthStore.getState().user ? (
                      <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">Welcome</h2>
                        <p>{useAuthStore.getState().user.email}</p>
                        <button
                          className="btn bg-red-600 text-white"
                          onClick={() => useAuthStore.getState().logout()}
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <Login />
                    )}
                  </div>
                )}
              </div>
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

      {cartOpen && (<div onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/40 z-10" />)}

      {accountOpen && (<div onClick={() => setAccountOpen(false)} className="fixed inset-0 bg-black/40 z-10" />)}
    </> 
  )
}

export default Navbar;