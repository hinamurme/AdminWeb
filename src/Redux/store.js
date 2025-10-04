import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from './ProductSlice/ProductSlice';
import UserSlice from './UserSlice/UserSlice'

export const store=configureStore({
    reducer:{
        product: ProductSlice,
        user:UserSlice,
    }
})