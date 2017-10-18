import React from 'react';
import DatePicker from 'react-datepicker';
import DatePickerDisplay from './DatePickerDisplay';

import moment from 'moment';

class DateRangePicker extends React.Component {
  constructor() {
    super();
    
    this.state = {
      minDateObj: moment(Date.now() - 30 * 24 * 60 * 60 * 1000), //month in past,
      maxDateObj: moment(Date.now()),
    }
  }

  render() {
    const { handleChange } = this.props;

    return (
      <div>
        <DatePicker
          customInput={<DatePickerDisplay />}
          todayButton={"Today"}
          selected={moment()}
          onChange={handleChange}
        />
      </div>
    );
  }

}

export default DateRangePicker;