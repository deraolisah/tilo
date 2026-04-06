import React from 'react'
import Navbar from '../components/Navbar';
import Footer from "../components/Footer.jsx";
import { Routes, Route} from 'react-router-dom';

import Home from '../pages/Home.jsx';
import Shop from '../pages/Shop.jsx';
import Contact from '../pages/Contact.jsx';

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='relative p-4 min-h-screen'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default AppRoutes;