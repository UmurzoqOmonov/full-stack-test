import { PacmanLoader } from "react-spinners";
import React, { useState } from "react";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "rgb(0, 145, 255)",
};

function Loader({ wait }) {
  let [color, setColor] = useState("rgb(0, 145, 255)");
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
