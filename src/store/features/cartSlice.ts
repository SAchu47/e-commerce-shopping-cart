import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from './productsSlice';

export interface ICart {
    products: IProduct[];
}

export interface ICartState {
    cartDetails: ICart;
}

const initialState: ICartState = {
    cartDetails: {
        products: [],
    },
};

export const CartSlice = createSlice({
    name: 'cartDetails',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const existingProduct = state.cartDetails.products.find(
                (item) => item.id === action.payload.id
            );

            if (existingProduct) {
                // If the product is already in the cart, just update the quantity
                existingProduct.quantity += action.payload.quantity;
            } else {
                // Otherwise, add the new product to the cart
                state.cartDetails.products.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
            state.cartDetails.products = state.cartDetails.products.filter(
                (item) => item.id !== action.payload.id
            );
        },
        updateProductQuantityInCart: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const product = state.cartDetails.products.find(
                (item) => item.id === action.payload.id
            );

            if (product) {
                product.quantity = action.payload.quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateProductQuantityInCart } = CartSlice.actions;

export default CartSlice.reducer;
