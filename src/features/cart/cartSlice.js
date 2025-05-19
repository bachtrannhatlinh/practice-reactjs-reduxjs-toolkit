import { createSlice } from "@reduxjs/toolkit";

const calculateTotalPayment = (products) => {
  return products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
};

// Get initial state from localStorage
const getInitialState = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const { listProduct, totalPayment } = JSON.parse(savedCart);
      // Validate that listProduct is an array
      if (Array.isArray(listProduct)) {
        return { listProduct, totalPayment };
      }
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  return {
    listProduct: [],
    totalPayment: 0,
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action) => {
      if (!Array.isArray(state.listProduct)) {
        state.listProduct = [];
      }
      const { id, name, price } = action.payload;
      const existingItem = state.listProduct.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.listProduct.push({ id, name, price, quantity: 1 });
      }
      state.totalPayment = calculateTotalPayment(state.listProduct);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        listProduct: state.listProduct,
        totalPayment: state.totalPayment
      }));
    },
    handleAddQuantity: (state, action) => {
      if (!Array.isArray(state.listProduct)) {
        state.listProduct = [];
      }
      const existingItem = state.listProduct.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalPayment = calculateTotalPayment(state.listProduct);
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify({
          listProduct: state.listProduct,
          totalPayment: state.totalPayment
        }));
      }
    },
    handleReduceQuantity: (state, action) => {
      if (!Array.isArray(state.listProduct)) {
        state.listProduct = [];
      }
      const existingItem = state.listProduct.find(
        (item) => item.id === action.payload
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalPayment = calculateTotalPayment(state.listProduct);
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify({
          listProduct: state.listProduct,
          totalPayment: state.totalPayment
        }));
      }
    },
    handleTotalProduct: (state) => {
      if (!Array.isArray(state.listProduct)) {
        state.listProduct = [];
      }
      state.totalPayment = calculateTotalPayment(state.listProduct);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        listProduct: state.listProduct,
        totalPayment: state.totalPayment
      }));
    },
    handleRemoveItem: (state, action) => {
      if (!Array.isArray(state.listProduct)) {
        state.listProduct = [];
      }
      const existingItem = state.listProduct.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        state.listProduct = state.listProduct.filter(
          (item) => item.id !== action.payload
        );
        state.totalPayment = calculateTotalPayment(state.listProduct);
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify({
          listProduct: state.listProduct,
          totalPayment: state.totalPayment
        }));
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
