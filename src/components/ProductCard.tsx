"use client";
import { FC, ReactElement } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/store/store";
import { addToCart } from "@/store/features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component props
interface ProductCardProps {
  id: string;
  imageUrl: string;
  productName: string;
  price: string;
  originalPrice: string;
  quantity?: number;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  quantity = 1,
  imageUrl,
  productName,
  price,
  originalPrice,
}): ReactElement => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    // Dispatch the addToCart action with the product details.
    try {
      dispatch(
        addToCart({
          id,
          imageUrl,
          productName,
          price,
          originalPrice,
          quantity,
        })
      );
      // toast animation to indicate the user product has been added to cart.
      toast.success("Added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  return (
    <div className="w-full sm:max-w-xs p-2 sm:p-4 border rounded-lg shadow-lg bg-white">
      {/* Toastr container */}
      <ToastContainer />
      {/* Fixed height for cropping the image */}
      <div className="relative w-full h-32 sm:h-56">
        <Image
          src={imageUrl}
          alt={productName}
          fill // Fills the container
          style={{
            objectFit: "cover", // Ensures that the image covers the container
            objectPosition: "center", // Center the image in the container
          }}
          priority
          className="rounded-lg"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {productName}
        </h3>
        <div className="flex items-center mt-2">
          <span className="text-sm sm:text-lg font-bold text-green-600">
            {price}
          </span>
          <span className="ml-2 text-xs sm:text-sm line-through text-gray-500">
            {originalPrice}
          </span>
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
