import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className='flex flex-col gap-2 overflow-hidden cursor-pointer'>
      <img 
        src={product.image} 
        draggable="false"
        alt='' 
        className='w-full aspect-4/3 rounded-xl' 
      />
      <div className='py-0'>
        <h4 className='text-lg font-normal'> {product.name} </h4>
        <p> {product.description} </p>
        <p className='font-mono font-semibold text-sm'> ₦{product.price} </p>
      </div>
    </Link>
  )
}

export default ProductCard;