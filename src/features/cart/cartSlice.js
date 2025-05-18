import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    quatityCam: 1,
    quantityTao: 1,
    quantityDua: 1,
  },
  reducers: {
    handleAddCam: (state, action) => {
      state.quatityCam += action.payload;
    },
    handleAddTao: (state, action) => {
      state.quantityTao += action.payload;
    },
    handleAddDua: (state, action) => {
      state.quantityDua += action.payload;
    },
    handleReduceCamSlice: (state, action) => {
      state.quatityCam -= action.payload;
    },
    handleReduceTaoSlice: (state, action) => {
      state.quantityTao -= action.payload;
    },
    handleReduceDuaSlice: (state, action) => {
      state.quantityDua -= action.payload;
    },
  },
});

export const {
  handleAddCam,
  handleAddDua,
  handleAddTao,
  handleReduceCamSlice,
  handleReduceDuaSlice,
  handleReduceTaoSlice,
} = cartSlice.actions;
export default cartSlice.reducer;
