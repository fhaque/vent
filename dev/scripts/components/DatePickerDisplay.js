import React from 'react';

class DatePickerDisplay extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <button
        onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}

// const DatePickerDisplay = props => {
//   return (
//     <button
//       onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

export default DatePickerDisplay;