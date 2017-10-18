import React from 'react';
import DatePicker from 'react-datepicker';
// import DatePicker from './datepicker/datepicker';
import Slider from 'rc-slider';
import DateRangePicker from './DateRangePicker';

import moment from 'moment';

// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class FilterMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      minSentiment: -1,
      maxSentiment: 1,
      dateObj: moment(),
    }

    this.sentimentRange = [-1,1];
    this.sentimentStep = 0.2;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleDateChange(date) {

    // const name = target.name;
    // const value =  target.value;
    
    console.log("On Filter Change:", date.constructor.name, date.valueOf() );

    this.setState({ dateObj: date });
  }

  handleRangeChange(value) {
    const [minSentiment, maxSentiment] = value;
    this.setState({ minSentiment, maxSentiment });
  }

  render() {
    const { minSentiment, maxSentiment, dateObj } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <Range 
            dots 
            step={this.sentimentStep}
            value={[minSentiment, maxSentiment]}
            defaultValue={[minSentiment, maxSentiment]} 
            min={this.sentimentRange[0]} 
            max={this.sentimentRange[1]} 
            onChange={this.handleRangeChange} 
          />
          <DateRangePicker handleChange={this.handleDateChange} />
          <DatePicker
            todayButton={"Today"}
            selected={dateObj}
            onChange={this.handleDateChange}
          />
        </form>
      </div>
    );
  }
}

export default FilterMenu;