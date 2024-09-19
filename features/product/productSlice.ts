import { createSlice } from '@reduxjs/toolkit';
import { ProductCardProps } from '@/@types';

interface ProductState {
  items: ProductCardProps[];
  isLoading: boolean;
  title: string
}

const initialState: ProductState = {
    items: [],
    isLoading: true,  
    title: ''  
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
        state.items = action.payload.items;
        state.title = action.payload.title
        state.isLoading = action.payload.isLoading
    },
    setLoading(state, action) {
        state.isLoading = action.payload;
    },
  },
});

export const { setProducts, setLoading } = productSlice.actions;
export default productSlice.reducer;