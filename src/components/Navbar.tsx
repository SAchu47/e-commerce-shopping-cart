"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  // Get the number of products in cart.
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.cartDetails.products.length
  );
  return (
    <nav className="bg-blue-600 p-4 sm:px-8 top-0 sticky z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-lg font-bold">
          <a href="/" className="hover:text-gray-400">
            MyShop
          </a>
        </div>

        {/* Nav Links */}
        <div className="flex space-x-5 items-center">
          {/* Cart Icon with Item Count */}
          <div className="relative">
            <a
              href="/cart"
              className="text-gray-300 hover:text-white flex items-center"
            >
              {/* Cart SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {/* Item Count */}
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </a>
          </div>
          <a href="/" className="text-gray-300 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-user-round"
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
