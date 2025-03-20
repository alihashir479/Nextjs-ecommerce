"use client";

import { useQuery } from "@tanstack/react-query"
import { ProductType } from "./types/Product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchProducts = async ():Promise<ProductType[]> => {
  const res = await fetch(`${API_BASE_URL}/products`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json();
};

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })
}
