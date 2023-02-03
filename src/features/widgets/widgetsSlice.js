import { nanoid, createSlice } from "@reduxjs/toolkit";

/**
 * Draw one Watcher initially
 */
const initialState = {
  widgets: [
    { type: "WATCHER", id: nanoid(), tabTitle: "Watcher", active: true },
  ],
};

/**
 * create a slice for handling basic widget actions: add, delete, activate
 */
export const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      state.widgets.push(action.payload);
    },
    deleteWidget: (state, action) => {
      state.widgets = state.widgets.filter((w) => w.id !== action.payload);
    },
    activateWidget: (state, action) => {
      state.widgets = state.widgets.map((w) => {
        w.active = w.id === action.payload;
        return w;
      });
    },
  },
});

// export actions
export const { addWidget, deleteWidget, activateWidget } = widgetsSlice.actions;

/**
 * shorthand for adding an incrementor
 */
export const addIncrementor = () =>
  addWidget({
    id: nanoid(),
    active: true,
    tabTitle: "Incrementor",
    type: "INCREMENTOR",
  });

/**
 * shorthand for adding a decrementor
 */
export const addDecrementor = () =>
  addWidget({
    id: nanoid(),
    active: true,
    tabTitle: "Decrementor",
    type: "DECREMENTOR",
  });

/**
 * shorthand for adding a watcher
 */
export const addWatcher = () =>
  addWidget({
    id: nanoid(),
    active: true,
    tabTitle: "Watcher",
    type: "WATCHER",
  });

/**
 * selector for the widgets
 */
export const selectWidgets = (state) => state.widgets.widgets;

export default widgetsSlice.reducer;
