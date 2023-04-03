import { nanoid, createSlice } from "@reduxjs/toolkit";

/**
 * Draw one Watcher initially
 */
const initialState = {
  widgets: [
    { type: "WATCHER", id: 123, tabTitle: "Watcher", active: true, mode: 'split-top' },
    { type: "INCREMENTOR", id: 456, tabTitle: "Incremenetor", active: true, mode: 'split-bottom' },
    { type: "INCREMENTOR", id: 789, tabTitle: "Incremenetor 2", active: true, mode: 'split-bottom' },
  ],
  activeTab: 2,
  layout: {}
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
    handleActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    handleUpdateLayout: (state, action) => {
      state.layout[action.payload.tabId] = action.payload.layout;
    }
  },
});

// export actions
export const { addWidget, deleteWidget, activateWidget, handleActiveTab, handleUpdateLayout } = widgetsSlice.actions;

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
