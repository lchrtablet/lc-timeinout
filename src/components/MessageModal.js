import React from 'react';

function MessageModal({ open, onClose, message, date, time }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        {date && <p><strong>Date:</strong> {date}</p>}
        {time && <p><strong>Time:</strong> {time}</p>}
        <button onClick={onClose} className="modal-close-button">
          Close
        </button>
      </div>
    </div>
  );
}

export default MessageModal;
