"use client";

import { useState } from "react";
import { useProducts } from "./api/useProducts";
import Categories from "./components/filters/Categories";
import PriceFilter from "./components/filters/Price";
import { Price } from "./api/types/Price";
import { ProductType } from "./api/types/Product";
import Product from "./components/Product";

export default function Home() {
  const { data: products, isLoading, error } = useProducts();
  const [category, selectCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<Price>({
    min: 0,
    max: 50000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !products) return <p>Error fetching products</p>;

  const changeCategory = (category: string) => {
    selectCategory(category);
  };

  const changePriceRange = (priceRange: Price) => {
    setPriceRange(priceRange);
  };

  const getFilteredProducts = () => {
    let filteredProducts = [...products]
    if(category !== 'all') {
      filteredProducts = filteredProducts.filter((product: ProductType) => product.category === category)
    }
    const { min, max } = priceRange
    filteredProducts = filteredProducts.filter((product: ProductType) => {
      if(min !== undefined) {
        return product.price >= min && product.price <= max
      }
      return product.price >= max
    })
    return filteredProducts
  }

  return (
    <div className="container mx-auto p-6 flex gap-6">
      <aside className="w-1/4 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-col gap-8">
          <Categories
            selectedCategory={category}
            changeCategory={changeCategory}
          />
          <PriceFilter
            selectedPriceRange={priceRange}
            changePriceRange={changePriceRange}
          />
        </div>
      </aside>
      <section className="w-3/4">
        <h1 className="text-3xl font-bold mb-6">E-Commerce Store</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getFilteredProducts()?.map((product: ProductType) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
