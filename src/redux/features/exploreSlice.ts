import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genre } from "./../../utils/tmdb";

type ExploreState = {
  explore: Genre;
  type: 'movie' | 'tv';
}

export const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    explore: { id: 28, name: "Action" },
    type: 'movie' 
  }as ExploreState,
  reducers: {
    add: (state: ExploreState, action: PayloadAction<Genre>) => {
      state.explore = action.payload
    },
    addType: (state: ExploreState,action: PayloadAction<"movie" | "tv">) => {
      state.type = action.payload;
    }
  },
});

export const { add,addType } = exploreSlice.actions;

export const selectExplore = (state: any) => state.explore;

export default exploreSlice.reducer;
