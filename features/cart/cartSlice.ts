import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number
}

interface CartState {
  count: number,
  items: CartItem[],
}

const initialState: CartState = {
    items: [],
    count: 0,    
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setInitialCart(state, action) {
        state.items = action.payload;
        state.count = state.items.length
    },
    addItemToCartState(state, action) {
        const newItem = action.payload
        const existingItem = state.items.find(item => item.id === newItem.id)

        if(existingItem) {
          existingItem.quantity += newItem.quantity
        } else {
          state.items.push(newItem)
          state.count += 1
        }
    },
    removeItemFromCart(state, action) {
      const ItemId = action.payload
      state.items = state.items.filter(item => item.id === ItemId)
      state.count -= 1
    },
    updateCartItemQuantityState(state, action) {
      const { ItemId, newQuantity } = action.payload
      const itemToUpdate = state.items.find(item => item.id === ItemId)

      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity
      }
    },
    clearCart(state) {
      state.items = []
      state.count = 0
    }
  },
});

export const { setInitialCart, addItemToCartState, updateCartItemQuantityState, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;