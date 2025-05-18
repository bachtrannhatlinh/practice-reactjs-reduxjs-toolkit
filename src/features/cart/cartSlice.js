import { createSlice } from "@reduxjs/toolkit";

const calculateTotalPayment = (products) => {
  return products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    listProduct: [],
    totalPayment: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price } = action.payload;
      const existingItem = state.listProduct.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.listProduct.push({ id, name, price, quantity: 1 });
      }
      state.totalPayment = calculateTotalPayment(state.listProduct);
    },
    handleAddQuantity: (state, action) => {
      const existingItem = state.listProduct.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalPayment = calculateTotalPayment(state.listProduct);
      }
    },
    handleReduceQuantity: (state, action) => {
      const existingItem = state.listProduct.find(
        (item) => item.id === action.payload
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalPayment = calculateTotalPayment(state.listProduct);
      }
    },
    handleTotalProduct: (state) => {
      state.totalPayment = calculateTotalPayment(state.listProduct);
    },
    handleRemoveItem: (state, action) => {
      const existingItem = state.listProduct.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        state.listProduct = state.listProduct.filter(
          (item) => item.id !== action.payload
        );
        state.totalPayment = calculateTotalPayment(state.listProduct);
      }
    },
  },
});

export const {
  addToCart,
  handleAddQuantity,
  handleReduceQuantity,
  handleTotalProduct,
  handleRemoveItem,
} = cartSlice.actions;
export default cartSlice.reducer;
