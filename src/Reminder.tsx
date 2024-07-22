import React, { useState } from 'react';
import { ReminderInfo } from './types/ReminderInfo';
import './Reminder.css';
import { useReminderContext } from './ReminderContext';
import { ReminderForm } from './ReminderForm';

interface ReminderProps {
  reminderInfo: ReminderInfo;
}

const Reminder: React.FC<ReminderProps> = ({ reminderInfo }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { deleteReminder } = useReminderContext();

  const handleReminderClick = () => {
    setShowDetails(true);
  };

  const handleCloseClick = () => {
    setShowDetails(false);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteReminder(reminderInfo.id);
      setShowDetails(false);
    } catch (error) {
      console.error('Error deleting reminder', error);
    }
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
    setShowDetails(false);
  };

  const day = reminderInfo.interval !== 1 ? 'days' : 'day';

  return (
    <>
      <div className="reminder" onClick={handleReminderClick}>
        <p className="reminder-title">{reminderInfo.title}</p>
        <p className="reminder-deadline">Deadline: {reminderInfo.deadline}</p>
        <p className="reminder-interval">Every {reminderInfo.interval} {day}</p>
      </div>
      {showDetails && (
        <>
          <div className="overlay" onClick={handleCloseClick}></div>
          <div className="popup">
            <div className="popup-content">
              <h2>{reminderInfo.title}</h2>
              <p>{reminderInfo.description}</p>
              <p>Deadline: {reminderInfo.deadline}</p>
              <p>Interval: {reminderInfo.interval} {day}</p>
              <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
              <button className="update-button" onClick={handleUpdateClick}>Update</button>
              <button className="close-button" onClick={handleCloseClick}>Close</button>
            </div>
          </div>
        </>
      )}
      {showUpdateForm && <ReminderForm reminder={reminderInfo} onClose={() => setShowUpdateForm(false)} />}
    </>
  );
};

export { Reminder };

