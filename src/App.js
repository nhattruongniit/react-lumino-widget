import React from "react";
import { useAppDispatch } from "./app/store";
import {
  addIncrementor,
  addDecrementor,
  addWatcher,
} from "./features/widgets/widgetsSlice";

// widgets
import Lumino from "./features/widgets/Lumino";
import MenuBar from "./features/widgets/MenuBar";
import LuminoTony from "./features/LuminoTony";

import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <button onClick={() => dispatch(addIncrementor())}>
        Add Incrementor!
      </button>
      <button onClick={() => dispatch(addDecrementor())}>
        Add Decrementor!
      </button>
      <button onClick={() => dispatch(addWatcher())}>Add Watcher!</button>

      {/* <MenuBar /> */}
      <Lumino />
      {/* <LuminoTony /> */}
    </div>
  );
}

export default App;
