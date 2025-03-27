import React, { useState } from 'react';
import './App.css';
import Logo from './components/Logo';
import DateTimeDisplay from './components/DateTimeDisplay';
import EmployeeIdForm from './components/EmployeeIdForm';
import Numpad from './components/Numpad';
import MessageModal from './components/MessageModal';
import timesheetService from './services/timesheetService'; // Import the timesheet service

function App() {
  const [employeeId, setEmployeeId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    message: '',
    date: '',
    time: ''
  });

  const handleClock = async (action) => {
    if (!employeeId) {
      showModal('Please enter your Employee ID.', '', '');
      return;
    }

    try {
      // Call the clock function from timesheetService
      const result = await timesheetService.clock(action, employeeId);

      console.log('API response:', result); // Log the API response

      if (result.success) {
        // If the API call was successful, set the message, date, and time from the response
        showModal(result.message, result.date, result.time);
      } else {
        showModal('Error processing your request', '', '');
      }
      setEmployeeId(''); // Reset employee ID after successful action
    } catch (error) {
      console.error('Error processing request:', error); // Log any error
      showModal('Error processing your request', '', '');
    }
  };

  const showModal = (message, date, time) => {
    setModalData({ message, date, time });
    setModalOpen(true);

    // Auto-close after 3 seconds
    setTimeout(() => {
      setModalOpen(false);
    }, 3000);
  };

  const handleNumpadInput = (value) => {
    if (value === 'backspace') {
      setEmployeeId((prev) => prev.slice(0, -1));
    } else {
      setEmployeeId((prev) => prev + value);
    }
  };

  return (
    <div className="app-container">
      <Logo />
      <h1>IN-OUT Monitoring</h1>

      <DateTimeDisplay />

      <div className="content-container">
        <EmployeeIdForm
          employeeId={employeeId}
          onClockIn={() => handleClock('clock_in')}
          onClockOut={() => handleClock('clock_out')}
        />

        <Numpad onButtonPress={handleNumpadInput} />
      </div>

      <MessageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalData.message}
        date={modalData.date}
        time={modalData.time}
      />
    </div>
  );
}

export default App;
