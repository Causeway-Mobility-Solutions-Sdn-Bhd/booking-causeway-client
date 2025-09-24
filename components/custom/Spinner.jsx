import React from 'react';

function Spinner({ size = 16, color = '#333', thickness = 2 }) {
  const spinnerStyle = {
    width: size,
    height: size,
    borderWidth: thickness,
    borderColor: `${color} transparent transparent transparent`,
  };

  return (
    <span
      className="inline-block rounded-full animate-spin border-solid"
      style={spinnerStyle}
    />
  );
}

export default Spinner;
