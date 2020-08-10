import React from 'react';
import Popup from 'reactjs-popup';
import './Message.css';

const Message = ({ open, messageTitle, messageBody, onClose }) => {
  return (
    <div className="message wrapper">
      <Popup open={open} onClose={onClose}>
        <div className="message-container">
          <h2 className="welcome-title">{messageTitle}</h2>
          <p>{messageBody}</p>
        </div>
      </Popup>
    </div>
  );
};

export default Message;
