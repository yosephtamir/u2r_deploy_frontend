import { createSlice } from '@reduxjs/toolkit';

interface WishListItem {
  id: string;
  name: string;
  price: number
}

interface WishListState {
  count: number,
  items: WishListItem[],
}

const initialState: WishListState = {
    items: [],
    count: 0,    
};

const cartSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setInitialWishList(state, action) {
        state.items = action.payload;
        state.count = state.items.length
    },
    addItemToWishListState(state, action) {
        const newItem = action.payload
        const existingItem = state.items.find(item => item.id === newItem.id)

        if (!existingItem) {
          state.items.push(newItem)
          state.count += 1
        }
    },
    removeItemFromWishList(state, action) {
      const ItemId = action.payload
      state.items = state.items.filter(item => item.id === ItemId)
      state.count -= 1
    },
    clearWishList(state) {
      state.items = []
      state.count = 0
    }
  },
});

export const { setInitialWishList, addItemToWishListState, removeItemFromWishList, clearWishList } = cartSlice.actions;
export default cartSlice.reducer;