import React from 'react';
import MessageFloat from './MessageFloat';

class MessageFloatsContainer extends React.Component {
  render() {
    const { messages } = this.props;

    return (
      <ul className="MessageFloatsContainer">
        {messages.map( (msg) => {
          return(
            <li key={msg.msgid} 
                className="MessageFloatsContainer__item"
                style={{
                  top: `${ 50 + Math.floor(50 * ( Math.random() * 2 - 1)) }%`,
                  animation: `animateCloud ${30 + Math.floor(Math.random() * 20 - 10)}s linear infinite` 
                }}
            > 
                <MessageFloat msg={msg} />
            </li>
          )
        })}
      </ul>
    );
  }
}

export default MessageFloatsContainer;