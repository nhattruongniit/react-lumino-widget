import React from "react";
import { decrement } from "./counterSlice";
import "./Decrementor.css";
import { useAppDispatch } from "../../app/store";

const Decrementor = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="decrementor">
      <button onClick={() => dispatch(decrement())}>Decrement Count</button>
    </div>
  );
};

export default Decrementor;
