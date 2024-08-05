import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTheme } from 'next-themes';

const CustomCalendar = ({ selectedDate, handleDateChange }) => {
  const { theme } = useTheme();
  
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
      calendarClassName={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
      dayClassName={() => (theme === 'dark' ? 'text-white' : 'text-black')}
    />
  );
};

export default CustomCalendar;
