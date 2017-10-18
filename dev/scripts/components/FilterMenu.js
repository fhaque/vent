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
      startDate: moment().subtract(1, 'months'), //month in past,
      endDate: moment(),
      userMessagesOnly: false,
    }

    this.sentimentRange = [-1,1];
    this.sentimentStep = 0.2;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { minSentiment, maxSentiment, startDate, endDate, userMessagesOnly  } = this.state;

    this.props.handleSubmit({
      minSentiment,
      maxSentiment,
      startDate: startDate.valueOf(),
      endDate: endDate.valueOf(),
      userMessagesOnly
    });
  }

  handleChange(e) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value });
  }

  handleChangeStart(startDate) {
    if ( startDate.isBefore(this.state.endDate) ) {
      this.setState({ startDate });
    }
    
  }

  handleChangeEnd(endDate) {
    if ( this.state.startDate.isBefore(endDate) ) {
      this.setState({ endDate });
    }
  }

  handleRangeChange(value) {
    const [minSentiment, maxSentiment] = value;
    this.setState({ minSentiment, maxSentiment });
  }

  render() {
    const { minSentiment, maxSentiment, startDate, endDate, userMessagesOnly } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>Only you messages</span>
            <input type="checkbox" name="userMessagesOnly" value={userMessagesOnly} />
          </label>
          <Range 
            dots 
            step={this.sentimentStep}
            value={[minSentiment, maxSentiment]}
            defaultValue={[minSentiment, maxSentiment]} 
            min={this.sentimentRange[0]} 
            max={this.sentimentRange[1]} 
            onChange={this.handleRangeChange} 
          />
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            handleChangeStart={this.handleChangeStart} 
            handleChangeEnd={this.handleChangeEnd} 
          />

          <input type="submit" value="Apply" />
        </form>
      </div>
    );
  }
}

export default FilterMenu;