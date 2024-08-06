import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './reducer/registerSlice';
import loginReducer from './reducer/loginSlice';
import categoryChillReducer from './reducer/categoryChillSlice';
import productReducer from './reducer/productSlice';
import productByCateReducer from './reducer/productByCateSlice';
import searchReducer from './reducer/searchSlice';
import cartReducer from './reducer/cartSlice';
import chiTietUserReducer from './reducer/userSlice'; 

// Cấu hình store Redux với các reducers khác nhau
export const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        categoryChill: categoryChillReducer,
        product: productReducer,
        productByCate: productByCateReducer,
        search: searchReducer,
        cart: cartReducer,
        chiTietUser: chiTietUserReducer, 
    },
});
