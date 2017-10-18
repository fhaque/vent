import React from 'react';
// import DatePicker from 'react-datepicker';
import DatePicker from './datepicker/datepicker';
import moment from 'moment';

// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class FilterMenu extends React.Component {
  constructor() {
    super();
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(e) {

    // const name = target.name;
    // const value =  target.value;
    
    console.log("On Filter Change:", e.constructor.name, e.valueOf() );
  }

  render() {
    return (
      <div>
        <form>
          <DatePicker

            todayButton={"Today"}
            onChange={this.handleDateChange}
          />
        </form>
      </div>
    );
  }
}

export default FilterMenu;