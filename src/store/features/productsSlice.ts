import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
    id: string;
    imageUrl: string;
    productName: string;
    price: string;
    originalPrice: string;
    quantity: number;
}

export interface IProductsState {
    products: IProduct[]
}

const initialState: IProductsState = {
    products: []
}

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<IProductsState>) => {
            state.products = action.payload.products
        }
    }
})

export const { addProducts } = ProductsSlice.actions;

export default ProductsSlice.reducer;