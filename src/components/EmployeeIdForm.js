import React from 'react';

function EmployeeIdForm({ employeeId, onClockIn, onClockOut }) {
  return (
    <form className="timesheet-form">
      <input
        type="text"
        value={employeeId}
        placeholder="Enter your Employee ID"
        readOnly
        className="employee-id-input"
      />
      
      <div className="button-group">
        <button 
          type="button" 
          onClick={onClockIn}
          className="clock-in-button"
        >
          In
        </button>
        <button 
          type="button" 
          onClick={onClockOut}
          className="clock-out-button"
        >
          Out
        </button>
      </div>
    </form>
  );
}

export default EmployeeIdForm;