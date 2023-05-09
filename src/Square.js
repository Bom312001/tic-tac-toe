import React from "react";
import "./App.css";

function Square({ value, handleTick, className, id }) {
  return (
    <button className={className} onClick={handleTick} id={id}>
      {value}
    </button>
  );
}

export default Square;
