import React from 'react';
import DatePicker from 'react-datepicker';
import DatePickerDisplay from './DatePickerDisplay';

import moment from 'moment';

class DateRangePicker extends React.Component {
  constructor() {
    super();
  }


  render() {
    const { handleChangeStart, handleChangeEnd, startDate, endDate } = this.props;

    return (
      <div>
        <DatePicker
          customInput={<DatePickerDisplay />}
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={handleChangeStart}
        />

        <DatePicker
          customInput={<DatePickerDisplay />}
          selected={endDate}
          selectsEnd
          todayButton={"Today"}
          startDate={startDate}
          endDate={endDate}
          onChange={handleChangeEnd}
        />
      </div>
    );
  }

}

export default DateRangePicker;