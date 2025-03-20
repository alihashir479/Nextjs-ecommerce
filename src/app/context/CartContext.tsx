"use client"

import { createContext, useContext, useReducer, ReactNode } from "react"

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: 'INCREASE_QUANTITY', payload: number}
  | { type: 'DECREASE_QUANTITY', payload: number}
  | { type: "CLEAR_CART" }

const initialState: CartItem[] = []

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity ? (item.quantity + 1) : 1 }
            : item
        )
      }
      return [...state, { ...action.payload, quantity: 1 }]

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload)

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
  
    case "DECREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      ); 

    case "CLEAR_CART":
      return []

    default:
      return state
  }
}

const CartContext = createContext<
  { cart: CartItem[]; dispatch: React.Dispatch<CartAction> } | undefined
>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context
}
