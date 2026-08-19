import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterTypes: [],
};

const filterTypeSlice = createSlice({
  name: "filterTypes",
  initialState,
  reducers: {
    AddFilterTypes: (state, action) => {
      state.filterTypes = action.payload;
    },
    RemoveFilterTypes: (state) => {
      state.filterTypes = [];
    },
  },
});

export const { AddFilterTypes, RemoveFilterTypes } = filterTypeSlice.actions;

export default filterTypeSlice.reducer;
