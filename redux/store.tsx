import { configureStore } from "@reduxjs/toolkit";
import gridSlice from "./slices/grid-slice";
export const store = configureStore({
  reducer: {
    grid: gridSlice,
  },
});
