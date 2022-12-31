import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  category: "",
};

const addSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export default addSlice.reducer;
export const { setName, setDescription, setCategory } = addSlice.actions;
