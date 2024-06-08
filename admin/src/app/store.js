import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import uploadReducer from '../features/upload/uploadSlice'
import productReducer from '../features/product/productSlice'
import brandReducer from '../features/brand/brandSlice'
import categoryReducer from '../features/pcategory/pcategorySlice'

// tổng hợp các reducer để truyền vào provider
export const store = configureStore({
    reducer:{
        auth : authReducer,
        upload:uploadReducer,
        product:productReducer,
        brand:brandReducer,
        category:categoryReducer,
    }
})