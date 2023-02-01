import { configureStore } from "@reduxjs/toolkit";
import currentDirSlice from "./slice/currentDirSlice";
import dataSlice from "./slice/dataSlice";

const store = configureStore({
  reducer: {
    data: dataSlice,
    currentDir: currentDirSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
