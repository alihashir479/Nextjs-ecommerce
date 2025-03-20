"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
export default function CartSummary() {
  const { cart } = useCart();
  const [shipping, setShipping] = useState(0);

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const totalAmount = calculateSubtotal() + shipping;
  return (
    <div className="w-full md:w-2/5 border border-gray-300 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>

      <div className="mb-4">
        <div className="space-y-2">
          <div
            className="flex justify-between p-3 rounded border border-gray-300 cursor-pointer"
            onClick={() => setShipping(0)}
          >
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                value="0"
                checked={shipping === 0}
                onChange={() => setShipping(0)}
              />
              Free Shipping
            </label>
            $0.00
          </div>

          <div
            className="flex justify-between p-3 rounded border border-gray-300 cursor-pointer"
            onClick={() => setShipping(15)}
          >
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                value="15"
                checked={shipping === 15}
                onChange={() => setShipping(0)}
              />
              Express Shipping
            </label>
            +$15.00
          </div>

          <div
            className="flex justify-between p-3 rounded border border-gray-300 cursor-pointer"
            onClick={() => setShipping(calculateSubtotal() * 0.21)}
          >
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                value={calculateSubtotal() * 0.21}
                checked={shipping === calculateSubtotal() * 0.21}
                onChange={() => setShipping(calculateSubtotal() * 0.21)}
              />
              Pick Up
            </label>
            %21.00
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-bold">${calculateSubtotal().toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xl font-bold mt-2 border-t border-gray-300 pt-2">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full mt-4 bg-black text-white py-2 rounded cursor-pointer">
        Proceed to Checkout
      </button>
    </div>
  );
}
