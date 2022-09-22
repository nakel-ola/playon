import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "./features/detailsSlice";
import exploreReducer from "./features/exploreSlice";


export const store = configureStore({
  reducer: {
    details: detailsReducer,
    explore: exploreReducer,
  }
});
