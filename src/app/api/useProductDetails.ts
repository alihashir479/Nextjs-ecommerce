"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductType } from "./types/Product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchProductById = async (id: string): Promise<ProductType> => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export function useProductDetails(id: string) {
  return useQuery<ProductType>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
}
