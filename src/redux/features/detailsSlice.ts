import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../../typing";

export const detailsSlice = createSlice({
  name: "details",
  initialState: {
    details: null
  },
  reducers: {
    add: (state: {details: Movie | null}, action: PayloadAction<Movie>) => {
      state.details = action.payload;
    },
    remove: (state: {details: Movie | null}) => {
      state.details = null
    }
  },
});

export const { add,remove } = detailsSlice.actions;

export const selectDetails = (state: any) => state.details;

export default detailsSlice.reducer;
