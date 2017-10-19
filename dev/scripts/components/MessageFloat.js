import React from 'react';

const MessageFloat = (props) => {
  const { msg } = props;

  let sentimentLightness = msg.sentiment * 20 + 80;

  if (msg.sentiment < -0.5 ) {
    sentimentLightness = msg.sentiment * 20 + 50;
  }

  const randWidthDelta = Math.floor(Math.random() * 100) - 100;

  const style = {
    contentContainer: {
      background: `linear-gradient(to bottom, #fff 5%, hsl(0, 0%, ${sentimentLightness}%) 100%)`,

      minWidth: `${400 + randWidthDelta}px`,
      maxWidth: `${400 + randWidthDelta}px`,
    }
  }

  return (
    <div className="MessageFloat">
      <div className="MessageFloat__contentContainer" style={style.contentContainer}>
        <p>{msg.msg}</p>
      </div>
    </div>
  );
}

export default MessageFloat;