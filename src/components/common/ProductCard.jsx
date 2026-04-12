import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className='shadow flex-flex-col gap-2 rounded-lg overflow-hidden cursor-pointer'>
      <img 
        src={product.image} 
        draggable="false"
        alt='' 
        className='w-full aspect-4/3' 
      />
      <div className='bg-white p-2 px-4'>
        <h4 className='font-medium text-lg'> {product.name} </h4>
        <p> {product.description} </p>
        <p className='font-mono'> ₦{product.price} </p>
      </div>
    </Link>
  )
}

export default ProductCard;