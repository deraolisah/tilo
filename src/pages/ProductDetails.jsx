import React from 'react';
import { ChevronRight } from "lucide-react"
import { Link, useParams } from 'react-router-dom';
import products from '../assets/data';

const ProductDetails = () => {
  // 1. Destructure 'id' from useParams
  const { id } = useParams();

  // 2. Find the product that matches the ID from the URL
  const product = products.find((p) => p.id === Number(id));

  // 3. Handle cases where the product might not be found
  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <section className='container'>
        {/* breadcrumbs */}
        <div className='flex items-center gap-2'>
            <Link to={"/shop"}> Shop </Link>
            <ChevronRight size={16} strokeWidth={1.5} />
            <Link to={`/product/${id}`}> {product.name} </Link>

        </div>
        
        <div>
            <h2 className='text-xl font-bold'>{product.name}</h2>
            <p>ID: {product.id}</p>
            <img src={product.image} alt='' className='' />
        </div>
      {/* Add more product details here if needed */}
    </section>
  );
};

export default ProductDetails;