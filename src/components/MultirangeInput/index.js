import * as React from 'react';
import './index.css';

const MultirangeInput = ({
  min,
  max,
  low,
  high,
  onLowChange,
  onHighChange
}) => {
  return (
    <div className="multirangeInputs">
      <input
        type="range"
        min={min}
        max={max}
        value={low}
        onChange={onLowChange}
        className="lowInputSlider"
      />

      <input
        type="range"
        min={min}
        max={max}
        value={high}
        onChange={onHighChange}
        className="highInputSlider"
      />
    </div>
  );
};
