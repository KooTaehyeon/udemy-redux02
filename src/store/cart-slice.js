import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItme = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItme) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItme.quantity++;
        existingItme.totalPrice = existingItme.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItme = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItme.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItme.quantity--;
        existingItme.totalPrice = existingItme.totalPrice - existingItme.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
