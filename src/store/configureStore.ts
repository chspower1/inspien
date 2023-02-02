import { configureStore } from "@reduxjs/toolkit";
import currentInfoSlice from "./slice/currentInfoSlice";
import dataSlice from "./slice/dataSlice";

const store = configureStore({
  reducer: {
    data: dataSlice,
    currentInfo: currentInfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
