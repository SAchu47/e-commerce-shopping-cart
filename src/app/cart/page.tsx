"use client";
import React, { useEffect, useState } from "react";
import CartItemComponent from "../../components/CartItem";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { IProduct } from "@/store/features/productsSlice";
import {
  removeFromCart,
  updateProductQuantityInCart,
} from "@/store/features/cartSlice";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  // Select the cart slice for accessing the products in cart.
  const cart = useSelector(
    (state: RootState) => state.cart.cartDetails.products
  );

  useEffect(() => {
    // Update cartItems state when cart changes
    setCartItems(cart);
    // Only run this effect when `cart` changes
  }, [cart]);

  const [discount, setDiscount] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Define discount codes
  const discountCodes: { [code: string]: number } = {
    SAVE10: 10,
    SAVE20PERCENT: 20,
  };

  // Handle the change in quantity for pthe product
  const handleQuantityChange = (id: string, quantity: number) => {
    // Dispatch Redux action to update the quantity
    dispatch(
      updateProductQuantityInCart({ id, quantity: Math.max(1, quantity) })
    );
  };

  // Handle the remove product from cart.
  const removeItem = (id: string) => {
    // Dispatch Redux action to remove the item from the cart.
    dispatch(removeFromCart({ id }));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseInt(item.price) * item.quantity,
    0
  );

  // Calculating the price after valid discount code applied.
  const calculateTotal = () => {
    if (
      discount > 0 &&
      discountCode.startsWith("SAVE") &&
      discountCode.includes("PERCENT")
    ) {
      return subtotal - (subtotal * discount) / 100;
    } else {
      return subtotal - discount;
    }
  };

  const total = calculateTotal();

  // Handle the discount code click.
  const applyDiscountCode = () => {
    if (discountCodes[discountCode]) {
      setDiscount(discountCodes[discountCode]);
      setErrorMessage("");
    } else {
      setDiscount(0);
      setErrorMessage("Invalid discount code");
    }
  };

  return (
    <div className="container p-4 w-full sm:flex relative sm:space-x-2 space-y-2">
      {/* Product List */}
      <div className="sm:w-1/2 rounded-lg shadow-md bg-white p-2">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.map((item) => (
          <CartItemComponent
            key={item.id}
            item={item}
            handleQuantityChange={handleQuantityChange}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className="rounded-lg shadow-md bg-white sm:w-1/2 sm:fixed sm:right-0 p-2">
        {/* Discount Apply Section */}
        <div className="">
          <h1 className="text-2xl font-bold mb-4">Apply your coupon</h1>
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="border p-2 w-40 md:w-48 lg:w-64 mr-2"
          />
          <button
            onClick={applyDiscountCode}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Apply Discount
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 border-t p-4 bg-gray-50">
          <h1 className="text-xl font-bold mb-2">PRICE DETAILS</h1>
          <div className="flex justify-between text-lg">
            <p>
              Price ({cartItems.length}{" "}
              {cartItems.length > 1 ? "items" : "item"})
            </p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-lg text-green-500">
              <p>Discount</p>
              {discountCode.includes("PERCENT")
                ? `-₹${((subtotal * discount) / 100).toFixed(2)}`
                : `-₹${discount.toFixed(2)}`}
            </div>
          )}
          <div className="flex justify-between text-lg">
            <p>Total Amount</p>
            <p className="font-bold text-xl">₹{total.toFixed(2)}</p>
          </div>
          {discount > 0 && (
            <p className="text-green-500 mt-2 text-right">
              You will save ₹{(subtotal - total).toFixed(2)} on this order
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
