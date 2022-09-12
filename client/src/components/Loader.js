import { PacmanLoader } from "react-spinners";
import React, { useState } from "react";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

function Loader({ wait }) {
  let [color, setColor] = useState("blue");
  return (
    <div className="sweet-loading">
      <PacmanLoader
        color={color}
        loading={wait}
        cssOverride={override}
        size={30}
      />
    </div>
  );
}

export default Loader;
