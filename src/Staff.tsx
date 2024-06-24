import { useState } from 'react';
import { Reminder } from './Reminder';
import { ReminderList } from './ReminderList';
import './Staff.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Staff = () => {
  const [showPopup, setShowPopup] = useState(false);
  const listReminders = ReminderList.map((reminder, index) =>  
    <Reminder key={index} {...reminder} />
  );

  const handleCreateClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSubmit = () => {
    // Add logic to handle form submission
  };

  return (
    <>
      <div className="staff-container">
        <div className="reminders-list">
          {listReminders}
        </div>
        <button className="create-button" onClick={handleCreateClick}>
          <FontAwesomeIcon className="plus-icon" icon={faPlus}/>
          Create
        </button>
      </div>
      {showPopup && (
        <>
          <div className="overlay" onClick={handlePopupClose}></div>
          <div className="popup">
            <form className="reminder-form">
              <label>
                Title:
                <input type="text" name="title" />
              </label>
              <label>
                To:
                <input type="text" name="to" />
              </label>
              <label>
                Description:
                <input type="text" name="description" />
              </label>
              <label>
                Deadline:
                <input type="date" name="deadline" />
              </label>
              <label>
                Interval:
                <input type="number" name="interval" />
              </label>
              <div className="button-group">
                <button type="button" onClick={handlePopupClose}>Close</button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};
export { Staff };

