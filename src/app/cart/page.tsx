"use client";

import { useCart } from "@/app/context/CartContext";
import CartProducts from "./CartProducts";
import CartSummary from "./CartSummary";

export default function CartPage() {
  const { cart } = useCart();

  if (cart.length === 0)
    return <div className="text-center text-bold mt-10">Cart is empty</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl font-bold mt-10">Cart</h1>
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <CartProducts />
        <CartSummary />
      </div>
    </div>
  );
}
