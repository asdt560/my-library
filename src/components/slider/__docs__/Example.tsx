import React, { FC } from "react";
import Slider, { SliderProps } from "../Slider";

const Example: FC<SliderProps> = ({ max = 100, min = 0 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Slider max={max} min={min} />
    </div>
  );
};

export default Example;
