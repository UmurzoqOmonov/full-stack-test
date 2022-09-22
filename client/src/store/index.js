import { createSlice, configureStore } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || "";
const user = JSON.parse(localStorage.getItem("user")) || null;

const appSlice = createSlice({
  name: "app",
  initialState: {
    isAuth: token,
    token,
    user,
  },
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.token = action.payload.jwt;
      state.user = action.payload.user;
    },
  },
});

const store = configureStore({ reducer: { app: appSlice.reducer } });

export const appActions = appSlice.actions;

export default store;
