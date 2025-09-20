import React from 'react';
import PropTypes from 'prop-types';

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

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  thickness: PropTypes.number,
};

export default Spinner;
