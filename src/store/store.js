import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "../reducer/reducer";

const rootReducer = combineReducers({
  todoSlice: todoSlice.reducer,
});

export const store = configureStore({
  initialState: { todo: [], doing: [], done: [] },
  reducer: rootReducer,
});
