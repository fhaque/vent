import React from 'react';
import PropTypes from 'prop-types';

class MessageForm extends React.Component {
  constructor() {
    super();

    this.state = {
      msg: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.handleSubmit(this.state.msg);
    this.setState({ msg: ''});
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name] : value });
  }

  render() {
    
    const { msg } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="MessageForm">
        <input 
          type="text" 
          name="msg" 
          value={msg} 
          onChange={this.handleChange} 
          className="MessageForm__msg"
          placeholder="Write a Thought..."
        />
        <input type="submit" value="Submit" className="MessageForm__submit"/>
      </form>
    );
  }
}

// MessageForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
// };

export default MessageForm;