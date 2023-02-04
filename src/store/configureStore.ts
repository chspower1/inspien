import { configureStore } from "@reduxjs/toolkit";
import currentInfoSlice from "./slice/currentInfoSlice";
import dataSlice from "./slice/dataSlice";
import dropBoxSlice from "./slice/dropBoxSlice";

const store = configureStore({
  reducer: {
    data: dataSlice,
    currentInfo: currentInfoSlice,
    dropBox: dropBoxSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
