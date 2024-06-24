import {ReminderInfo} from './types/ReminderInfo';
import './Reminder.css';
import { useState } from 'react';

// search functionality

interface ReminderDetailsProps extends ReminderInfo {
  showAll: boolean;
}

const ReminderDetails = ({ title, createdBy, deadline, description, interval, showAll }: ReminderDetailsProps) => {
  const day: string = interval !== 1 ? "days" : "day";
  return (
    <>
      <p className="reminder-title">{title}</p>
      <p className="reminder-from">From: {createdBy}</p>
      <p className="reminder-deadline">Deadline: {deadline}</p>
      {showAll && (
        <div className="reminder-details">
          <p>{description}</p>
          <p>Every {interval} {day}</p>
        </div>
      )}
    </>
  );
};

const Reminder = (prop: ReminderInfo) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleReminderClick = () => {
    setShowDetails(true);
  }

  const handleCloseClick = () => {
    setShowDetails(false);
  }

  return (
    <>
      <div className="reminder" onClick={handleReminderClick}>
        <ReminderDetails {...prop} showAll={false} />
      </div>
      {showDetails && (
        <>
          <div className="overlay" onClick={handleCloseClick}></div>
          <div className="reminder-details-popup">
            <button onClick={handleCloseClick}>Close</button>
            <ReminderDetails {...prop} showAll={true} />
          </div>
        </>
      )}
    </>
  );
};

export { Reminder };
