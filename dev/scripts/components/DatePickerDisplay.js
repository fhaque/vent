import React from 'react';

// class DatePickerDisplay extends React.Component {
  
//     render () {
//       return (
//         <button
//           onClick={this.props.onClick}>
//           {this.props.value}
//         </button>
//       )
//     }
//   }


const DatePickerDisplay = props => {
  console.log(props);
  return (
    
    <button
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default DatePickerDisplay;