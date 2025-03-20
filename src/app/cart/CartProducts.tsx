"use client";

import { useCart } from "@/app/context/CartContext";

export default function CartProducts() {
  const { cart, dispatch } = useCart();
  return (
    <div className="w-full md:w-3/5">
      <div className="rounded-lg p-4">
        <div className="grid grid-cols-4 md:grid-cols-5 font-semibold border-b-4 border-gray-300 pb-2 mb-4">
          <div className="col-span-2">Product</div>
          <div>Quantity</div>
          <div>Price</div>
          <div className="hidden md:block">Subtotal</div>
        </div>

        {cart.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 md:grid-cols-5 items-center py-6 border-b border-gray-300"
          >
            <div className="col-span-2 flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex flex-col truncate">
                <h2 className="text-sm md:text-lg font-semibold truncate">
                  {item.title}
                </h2>
                <h2
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                  }
                  className="cursor-pointer"
                >
                  X Remove
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch({ type: "DECREASE_QUANTITY", payload: item.id })
                }
                className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch({ type: "INCREASE_QUANTITY", payload: item.id })
                }
                className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
              >
                +
              </button>
            </div>

            <div>${item.price.toFixed(2)}</div>
            <div className="hidden md:block">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
