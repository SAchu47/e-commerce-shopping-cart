"use client";
import React from "react";
import Image from "next/image";

interface CartItemProps {
  item: {
    id: string;
    productName: string;
    price: string;
    originalPrice: string;
    quantity: number;
    imageUrl: string;
  };
  handleQuantityChange: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

// Function to truncate long product names
const truncateName = (name: string, maxLength: number) => {
  return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
};

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  handleQuantityChange,
  removeItem,
}) => {
  return (
    <div className="flex items-center justify-between mb-4 p-2 border-b">
      <div className="w-12 h-12 sm:w-24 sm:h-24 relative">
        <Image
          src={item.imageUrl}
          alt={item.productName}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="rounded-lg"
        />
      </div>
      <div className="flex-1 mx-4">
        <h2 className="hidden sm:block text-lg font-semibold">
          {truncateName(item.productName, 30)}{" "}
        </h2>
        <h2 className="sm:hidden text-lg font-semibold">
          {truncateName(item.productName, 10)}{" "}
        </h2>
        <p>
          <span className="line-through text-gray-500 mr-2">
            ₹{parseInt(item.originalPrice).toFixed(2)}
          </span>
          <span className="text-green-500">
            ₹{parseInt(item.price).toFixed(2)}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="bg-blue-500 text-white h-6 w-6 content-center rounded"
          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
        >
          -
        </button>
        {item.quantity}
        <button
          className="bg-blue-500 text-white h-6 w-6 content-center rounded"
          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500">
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
          className="lucide lucide-trash"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
};

export default CartItemComponent;
