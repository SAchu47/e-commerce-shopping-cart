"use client";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import {
  IProduct,
  IProductsState,
  addProducts,
} from "@/store/features/productsSlice";
import { RootState, useAppDispatch } from "@/store/store";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Type of the data got after fetching data from fake store api.
type OriginalProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

// Function to convert the data got from API to usable format required by the application.
function convertProducts(products: OriginalProduct[]): IProductsState {
  const allProducts = products.map((product) => ({
    id: product.id.toString(),
    imageUrl: product.image,
    quantity: 1,
    productName: product.title,
    price: product.price.toFixed(2), // Convert to string with two decimal places
    originalPrice: product.price.toFixed(2), // Assuming originalPrice is the same as price
  }));
  return {
    products: allProducts,
  };
}

const Page: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  // Load products from fake store api.
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        const convertedProducts = convertProducts(json);
        // Dispatch Redux action to add products.
        dispatch(addProducts(convertedProducts));
        // Set loading to false after data is fetched
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        // Ensure to set loading to false even if there is an error
        setLoading(false);
      });
  }, [dispatch]);

  // Get the data from the redux state.
  const allProducts = useSelector(
    (state: RootState) => state.products.products
  );

  return (
    <div className="p-4 sm:p-8 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading
        ? // Render skeletons if loading
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : // Render product cards if data is loaded
          allProducts.map((product: IProduct) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              productName={product.productName}
              price={product.price}
              originalPrice={product.originalPrice}
            />
          ))}
    </div>
  );
};

export default Page;
