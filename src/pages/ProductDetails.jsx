import React from 'react'
import { useParams } from 'react-router-dom';
import products from '../assets/data';

const ProductDetails = () => {
    // 1. Destructure the 'id' from useParams
    const id = useParams();

    // 2. Find the product that matches the ID from the URL
    // Note: useParams returns a string; you may need to convert types if your data uses numbers
    const product = products.find((p) => (p.id) === id);

    // 3. Handle cases where the product might not be found
    if (!product) {
        return <div>Product not found!</div>;
    }
        
    return (
        <div>
            {product.id}
            {product.name}
        
        </div>
    )
}

export default ProductDetails;