// components/slider/slider.tsx
import React, { MouseEventHandler } from "react";
import styled from "styled-components";

export type SliderProps = {
  max: number;
  min: number;
};

const StyledSlider = styled.input<SliderProps>``;

const Slider: React.FC<SliderProps> = ({ max, min }) => {
  const controlFromSlider = () => {
    fillSlider("#C6C6C6", "#25daa5");
    if (currentMin > currentMax) {
      currentMin = currentMax;
    }
    //newMin.emit(currentMin);
  };

  const controlToSlider = () => {
    fillSlider("#C6C6C6", "#25daa5");
    if (currentMin > currentMax) {
      currentMin = currentMax;
    }
    setToggleAccessible();
    //newMax.emit(currentMax);
  };

  const fillSlider = (sliderColor, rangeColor) => {
    const rangeDistance = max - min;
    const fromPosition = currentMin - min;
    const toPosition = currentMax - min;
    toSlider.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} 100%)`;
  };

  const setToggleAccessible = () => {
    if (Number(currentMax) <= 0 ) {
      toSlider.style.zIndex = '2';
    } else {
      toSlider.style.zIndex = '0';
    }
  }

  const minLabelPosition = () => {
    const rangeDistance = max - min;
    const fromPosition = currentMin - min;
    return `calc(${(fromPosition)/(rangeDistance)*100}% - 40px)`;
  }

  const maxLabelPosition = () => {
    const rangeDistance = max - min;
    const toPosition = max - currentMax;
    return `calc(${(toPosition)/(rangeDistance)*100}% - 40px)`;
  }

  return (
    <div className="range_container">
      <div className="sliders_control">
        <input
          step="0.01"
          onChange={() => controlFromSlider()}
          id="fromSlider"
          type="range"
          min={min}
          max={max}
        />
        <input
          step="0.01"
          onChange={() => controlToSlider()}
          id="toSlider"
          type="range"
          min="{{ min }}"
          max="{{ max }}"
        />
      </div>
      <div className="sliders_values">
        <span>{{ currentMin }}</span>
        <span>{{ currentMax }}</span>
      </div>
    </div>
  );
};

export default Slider;
