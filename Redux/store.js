import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { configureStore } from "@reduxjs/toolkit";
import cartItem from "./Reducers/cartItem";
import thunk from "redux-thunk";

const reducers = combineReducers({
  cartItem: cartItem,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
