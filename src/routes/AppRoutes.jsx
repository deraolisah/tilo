import React from 'react'
import Navbar from '../components/Navbar';
import Chatbox from '../components/Chatbox.jsx';
import Footer from "../components/Footer.jsx";
import { Routes, Route} from 'react-router-dom';

import Home from '../pages/Home.jsx';
import Shop from '../pages/Shop.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Checkout from '../pages/Checkout.jsx';

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='relative min-h-screen pt-22 md:pt-28'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </div>
      <Chatbox />
      <Footer />
    </>
  )
}

export default AppRoutes;