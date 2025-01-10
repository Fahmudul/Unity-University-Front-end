import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "Auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);
const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware);
  },
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
