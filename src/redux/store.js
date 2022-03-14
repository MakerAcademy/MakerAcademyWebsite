import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import rootReducer from "./reducers";
import { listsApi } from "./services/content";

const store = configureStore({
  reducer: {
    [listsApi.reducerPath]: listsApi.reducer,
    root: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listsApi.middleware),
});

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch();

export default store;
