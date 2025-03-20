"use client";
import { use } from "react";
import { useProductDetails } from "@/app/api/useProductDetails";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, isLoading, error } = useProductDetails(id);
  const { dispatch } = useCart()

  if (isLoading) return <p>Fetching the product...</p>;
  if (error || !product) return <p>Error fetching product</p>;

  const totalStars = [];
  for (let i = 0; i < Math.round(product.rating.rate); i++) {
    totalStars.push(i);
  }

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: {...product, quantity: 1 } });
  }

  return (
    <div className="container mx-auto">
      <div className="text-gray-500">
        <span>Home &gt;</span>
        <span className="ml-2">Shop &gt;</span>
        <span className="ml-2">{product?.category} &gt;</span>
        <span className="ml-2">Product</span>
      </div>
      <div className="flex flex-col gap-6 mt-5 md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={product?.image} alt={product?.title} />
        </div>
        <div className="w-full md:w-1/2">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex">
                {totalStars.map((_, idx) => (
                  <img key={idx} src="/icons/star.png" className="w-4 h-4" />
                ))}
              </div>
              <span>{product.rating.count} reviews</span>
            </div>
            <h2 className="text-4xl">{product.title}</h2>
            <div className="text-gray-500 mt-4">{product.description}</div>
            <div className="font-bold mt-4 text-xl">
              ${product.price.toFixed(2)}
            </div>
            <button className="w-full bg-black text-white px-4 py-2 text-sm rounded cursor-pointer mt-5" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
