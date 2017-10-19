import React from 'react';
import DatePicker from 'react-datepicker';
import DatePickerDisplay from './DatePickerDisplay';

import moment from 'moment';

class DateRangePicker extends React.Component {
  constructor() {
    super();
  }


  render() {
    const { handleChangeStart, handleChangeEnd, startDate, endDate, className } = this.props;

    return (
      <div className={className}>
        <label className={`${className}__datePickerContainer`}>
          <span className={`${className}__labelText`}>Start Date:</span>
          <DatePicker
            customInput={<DatePickerDisplay />}
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={handleChangeStart}
          />
        </label>
        <label className={`${className}__datePickerContainer`}>
          <span className={`${className}__labelText`}>End Date:</span>
          <DatePicker
            customInput={<DatePickerDisplay />}
            selected={endDate}
            selectsEnd
            todayButton={"Today"}
            startDate={startDate}
            endDate={endDate}
            onChange={handleChangeEnd}
          />
        </label>
      </div>
    );
  }

}

export default DateRangePicker;