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

import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  console.log('giflow')
  return (
    <div className="App">
      <button onClick={() => dispatch(addIncrementor())}>
        Add Incrementor!
      </button>
      <button onClick={() => dispatch(addDecrementor())}>
        Add Decrementor!
      </button>
      <button onClick={() => dispatch(addWatcher())}>Add Watcher!</button>

      <MenuBar />

      <Lumino />
    </div>
  );
}

export default App;


/*
khi develop code xong -> qc test -> dua code len production
*/