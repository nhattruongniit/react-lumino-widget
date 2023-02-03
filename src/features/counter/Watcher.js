import React from "react";
import { selectCount } from "./counterSlice";
import { useSelector } from "react-redux";

import "./Watcher.css";

const Watcher = () => {
  const count = useSelector(selectCount);
  return <div className="watcher">The current count is {count}</div>;
};

export default Watcher;
