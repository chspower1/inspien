import { configureStore } from "@reduxjs/toolkit";
import currentInfoSlice from "./slice/currentInfoSlice";
import dataSlice from "./slice/dataSlice";
import contextMenuSlice from "./slice/contextMenuSlice";

const store = configureStore({
  reducer: {
    data: dataSlice,
    currentInfo: currentInfoSlice,
    contextMenu: contextMenuSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
