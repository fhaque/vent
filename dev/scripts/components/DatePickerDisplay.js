import React from 'react';

const DatePickerDisplay = props => {
  return (
    <button
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default DatePickerDisplay;