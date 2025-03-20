import { ProductType } from "@/app/api/types/Product";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

interface Props {
  product: ProductType;
}
export default function Product({ product }: Props) {
  const { dispatch } = useCart()
  const router = useRouter()
  const totalStars = [];
  for (let i = 0; i < Math.round(product.rating.rate); i++) {
    totalStars.push(i);
  }

  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1 } });
  }

  return (
    <div className="flex flex-col" onClick={() => router.push(`/product/${product.id}`)}>
      <div className="relative h-100 mb-4 group">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover cursor-pointer"
        />
        <button onClick={addToCart} className="w-full cursor-pointer rounded absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add to Cart
        </button>
      </div>
      <div className="flex items-center">
        {totalStars.map((_, idx) => (
          <img key={idx} src="icons/star.png" className="w-4 h-4" />
        ))}
      </div>
      <div className="truncate text-black">{product.title}</div>
      <div className="font-bold text-black">${product.price.toFixed(2)}</div>
    </div>
  );
}
