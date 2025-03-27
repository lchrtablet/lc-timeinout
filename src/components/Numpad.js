import React from 'react';

function Numpad({ onButtonPress }) {
  const buttons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0', { action: 'backspace', label: '⌫ Backspace', span: 2 }
  ];

  return (
    <div className="numpad">
      {buttons.map((button, index) => {
        if (typeof button === 'string') {
          return (
            <button 
              key={index}
              onClick={() => onButtonPress(button)}
              className="numpad-button"
            >
              {button}
            </button>
          );
        } else {
          return (
            <button
              key={index}
              onClick={() => onButtonPress(button.action)}
              className={`numpad-button ${button.action}`}
              style={{ gridColumn: `span ${button.span}` }}
            >
              {button.label}
            </button>
          );
        }
      })}
    </div>
  );
}

export default Numpad;