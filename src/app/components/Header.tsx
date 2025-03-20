"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const { cart } = useCart()
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        
        <Link href='/' className="text-2xl font-bold text-gray-800">
          Ebra
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link href="/" className="text-gray-700 hover:text-blue-500">Shop</Link>
          <Link href="/" className="text-gray-700 hover:text-blue-500">Product</Link>
          <Link href="/" className="text-gray-700 hover:text-blue-500">Contact</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Image src="/icons/search.png" alt="Search" width={24} height={24} />
          <Image src="/icons/user.png" alt="Wishlist" width={24} height={24} />
          <div className="flex items-center gap-2">
            <Link href='/cart'> <Image src="/icons/shoppingbag.png" alt="Profile" width={24} height={24} /> </Link>
            <span className="w-6 h-6 rounded-full text-center text-white bg-black">{cart.length}</span>
          </div>
        </div>

      </div>
    </header>
  )
}
