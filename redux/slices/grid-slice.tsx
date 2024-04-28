import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

// userCollapse

const initialState = new Map([
    ['userCollapse', true],
  ]);

const gridSlice = createSlice({
  name: "grid",
  initialState: Object.fromEntries(initialState),
  reducers: {
    turnOffSkeleton: (state, action) => {
        const gridName:string = action.payload
        state[gridName]=false;
        console.log(initialState)
    },
  },
});

export const { turnOffSkeleton } = gridSlice.actions;
export default gridSlice.reducer;
