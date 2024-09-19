import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import registrationReducer from '../features/user/registrationSlice'
import navigationReducer from '../features/navigation/navigationSlice'
import cartReducer from '../features/cart/cartSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'
import productReducer from '../features/product/productSlice'
import orderReducer from '../features/order/orderSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        registration: registrationReducer,
        navigation: navigationReducer,
        cart: cartReducer,
        order: orderReducer,
        wishlist: wishlistReducer,
        products: productReducer,
    },
})

export default store