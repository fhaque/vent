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
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.name === 'userMessagesOnlyLabel') {
      this.setState({ userMessagesOnly: !this.state.userMessagesOnly });
    }
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
    const target = e.target;
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

  componentWillReceiveProps(nextProps) {
    const { filter } = nextProps;

    if(!this.props.open) {
      if (Object.keys(filter).length !== 0) {
        this.setState({
          minSentiment: filter.minSentiment,
          maxSentiment: filter.maxSentiment,
          startDate: moment(filter.startDate), //month in past,
          endDate: moment(filter.endDate),
          userMessagesOnly: filter.userMessagesOnly,
        });
      }
    }
  }

  componentDidMount() {
    console.log("Filter menu mounted");
      const { filter } = this.props;
      console.log(filter);
      if (Object.keys(filter).length !== 0) {
        this.setState({
          minSentiment: filter.minSentiment,
          maxSentiment: filter.maxSentiment,
          startDate: moment(filter.startDate), //month in past,
          endDate: moment(filter.endDate),
          userMessagesOnly: filter.userMessagesOnly,
        });
      }
  }

  render() {
    const { minSentiment, maxSentiment, startDate, endDate, userMessagesOnly } = this.state;

    const { open, userLoggedIn } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className={`FilterMenu ${open ? 'FilterMenu--open' : ''}`}>
        {userLoggedIn &&
          <input 
            id="userMessagesOnlyCheckbox" 
            type="checkbox" 
            name="userMessagesOnly" 
            className="FilterMenu__userMessagesOnlyCheckBox"
            checked={userMessagesOnly}
            onChange={this.handleChange}
          />
        }
        {userLoggedIn &&
          <label htmlFor="userMessagesOnlyCheckbox" className="FilterMenu__label FilterMenu__checkboxLabel">
            <span className="FilterMenu__checkbox"></span>
            <span className="FilterMenu__labelText">Only your messages</span>
          </label>
        }
        <Range 
          dots 
          step={this.sentimentStep}
          value={[minSentiment, maxSentiment]}
          defaultValue={[minSentiment, maxSentiment]} 
          min={this.sentimentRange[0]} 
          max={this.sentimentRange[1]} 
          onChange={this.handleRangeChange}
          className="FilterMenu__sentiment"
          trackStyle={[{backgroundColor: '#ffd000'}]}
        />
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          handleChangeStart={this.handleChangeStart} 
          handleChangeEnd={this.handleChangeEnd}
          className="FilterMenu__dateRange" 
        />

        <input type="submit" value="Apply" className="FilterMenu__submit" />
      </form>
    );
  }
}

export default FilterMenu;