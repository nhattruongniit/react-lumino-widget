import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import widgetsReducer from "../features/widgets/widgetsSlice";
import { useDispatch } from "react-redux";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    widgets: widgetsReducer,
  },
  // middleware: [logger],
});

export const useAppDispatch = () => useDispatch();
