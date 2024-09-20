import React, { FC } from "react";
import Slider, { SliderProps } from "../Slider";

const Example: FC<SliderProps> = ({ max = 100, min = 0, step = 0.01 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Slider max={max} min={min} step={step} />
    </div>
  );
};

export default Example;
