import { createSlice } from '@reduxjs/toolkit';

interface OrderItem {
  id: string;
  name: string;
  price: number
}

interface OrderState {
  count: number,
  items: OrderItem[],
}

const initialState: OrderState = {
    items: [],
    count: 0,    
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setInitialOrder(state, action) {
        state.items = action.payload;
        state.count = state.items.length
    },
    addItemToOrderState(state, action) {
        const newItem = action.payload
        const existingItem = state.items.find(item => item.id === newItem.id)

        if(!existingItem) {
          state.items.push(newItem)
          state.count += 1
        }
    },
    removeItemFromOrder(state, action) {
      const ItemId = action.payload
      state.items = state.items.filter(item => item.id === ItemId)
      state.count -= 1
    },
    clearOrder(state) {
      state.items = []
      state.count = 0
    }
  },
});

export const { setInitialOrder, addItemToOrderState, removeItemFromOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;