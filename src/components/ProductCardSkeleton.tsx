import { FC, ReactElement } from "react";

// Skeleton Loader for products.
const ProductCardSkeleton: FC = (): ReactElement => {
  return (
    <div className="w-full sm:max-w-xs p-2 sm:p-4 border rounded-lg shadow-lg bg-white animate-pulse">
      <div className="relative w-full h-32 sm:h-56 bg-gray-300 rounded-lg"></div>
      <div className="mt-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="flex items-center mt-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 ml-2"></div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-300 h-8 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
