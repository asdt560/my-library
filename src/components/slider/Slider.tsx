// components/slider/slider.tsx
import React, { useState, MouseEventHandler } from "react";
import styled from "styled-components";

export type SliderProps = {
  max: number;
  min: number;
  step: number;
};

export type ButtonProps = {
  text?: string;
  primary?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 300px;
  margin: 25px auto;
`;

const SliderValues = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  span {
    width: 80px;
    text-align: center;
    font-family: InterRegular;
    color: #181d17;
    font-size: 16px;
  }
`;

const SliderControl = styled.div`
  position: relative;
  min-height: 15px;
`;

const SliderStyled = styled.input<SliderProps>`
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  width: 100%;
  position: absolute;
  background-color: #c6c6c6;
  pointer-events: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: all;
    width: 13px;
    height: 13px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #c6c6c6;
    cursor: pointer;
  }
  &::-webkit-slider-thumb:hover {
    background: #f7f7f7;
  }
  &::-webkit-slider-thumb:active {
    box-shadow:
      inset 0 0 3px #387bbe,
      0 0 9px #387bbe;
    -webkit-box-shadow:
      inset 0 0 3px #387bbe,
      0 0 9px #387bbe;
  }
`;

const Slider: React.FC<SliderProps> = ({ max, min, step }) => {
  const [currentMin, setCurrentMin] = useState(min);
  const [currentMax] = useState(max);
  const [toSliderStyles, setToSliderStyles] = useState({
    zIndex: "0",
    background: "#c6c6c6",
  });
  const [spanMargins, setSpanMargins] = useState({
    marginLeft: "0",
    marginRight: "0",
  });

  const controlFromSlider = () => {
    fillSlider("#C6C6C6", "#25daa5");
    if (currentMin > currentMax) {
      setCurrentMin(currentMax);
    }
    minLabelPosition();
    maxLabelPosition();
  };

  const controlToSlider = () => {
    fillSlider("#C6C6C6", "#25daa5");
    if (currentMin > currentMax) {
      setCurrentMin(currentMax);
    }
    setToggleAccessible();
    minLabelPosition();
    maxLabelPosition();
  };

  const fillSlider = (sliderColor: string, rangeColor: string) => {
    const rangeDistance = max - min;
    const fromPosition = currentMin - min;
    const toPosition = currentMax - min;
    setToSliderStyles((prevState) => {
      return {
        ...prevState,
        background: `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} 100%)`,
      };
    });
  };

  const setToggleAccessible = () => {
    if (Number(currentMax) <= 0) {
      setToSliderStyles((prevState) => {
        return {
          ...prevState,
          zIndex: "2",
        };
      });
    } else {
      setToSliderStyles((prevState) => {
        return {
          ...prevState,
          zIndex: "0",
        };
      });
    }
  };

  const minLabelPosition = () => {
    const rangeDistance = max - min;
    const fromPosition = currentMin - min;
    setSpanMargins((prevState) => {
      return {
        ...prevState,
        marginLeft: `+calc(${(fromPosition / rangeDistance) * 100}% - 40px)`,
      };
    });
  };

  const maxLabelPosition = () => {
    const rangeDistance = max - min;
    const toPosition = max - currentMax;
    setSpanMargins((prevState) => {
      return {
        ...prevState,
        marginRight: `calc(${(toPosition / rangeDistance) * 100}% - 40px)`,
      };
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    console.log("clicked", e);
  };

  return (
    <RangeContainer className="range_container">
      <SliderControl className="sliders_control">
        <SliderStyled
          aria-label="slider"
          step={step}
          onClick={(e) => handleClick(e)}
          onChange={() => controlFromSlider()}
          id="fromSlider"
          data-testid="fromSlider"
          type="range"
          style={{ height: "0", zIndex: "1" }}
          value={currentMin}
          min={min}
          max={max}
        />
        <SliderStyled
          aria-label="slider"
          step={step}
          onChange={() => controlToSlider()}
          id="toSlider"
          type="range"
          style={toSliderStyles}
          value={currentMax}
          min={min}
          max={max}
        />
      </SliderControl>
      <SliderValues className="sliders_values">
        <span style={{ marginLeft: spanMargins.marginLeft }}>{currentMin}</span>
        <span style={{ marginRight: spanMargins.marginRight }}>
          {currentMax}
        </span>
      </SliderValues>
    </RangeContainer>
  );
};

export default Slider;
