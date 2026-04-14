import React from 'react'
import Navbar from '../components/common/Navbar';
import Chatbox from '../components/common/Chatbox.jsx';
import Footer from "../components/common/Footer.jsx";
import { Routes, Route} from 'react-router-dom';

import Home from '../pages/Home.jsx';
import Shop from '../pages/Shop.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Checkout from '../pages/Checkout.jsx';
import ProductDetails from '../pages/ProductDetails.jsx';

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='relative min-h-screen pt-24 md:pt-30'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/checkout' element={<Checkout />} />

          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
      </div>
      <Chatbox />
      <Footer />
    </>
  )
}

export default AppRoutes;