import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";
import { Directory, File, MockupState } from "./Mockup";
const initialState = {
  value: MockupState,
};
const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Directory | File>) => {},
    remove: (state, action: PayloadAction<number>) => {},
    update: (state, action: PayloadAction<Directory | File>) => {},
  },
});

export const { add, remove, update } = dataSlice.actions;
export const selectCount = (state: RootState) => state.value;
export default dataSlice.reducer;
