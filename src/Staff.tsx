import { Reminder } from './Reminder';
import { ReminderList } from './ReminderList';
import './Staff.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Staff = () => {
  const listReminders = ReminderList.map((reminder, index) =>  
    <Reminder key={index} {...reminder} />
  );

  return (
    <div className="staff-container">
      <div className="reminders-list">
        {listReminders}
      </div>
      <button className="create-button">
        <FontAwesomeIcon className="plus-icon" icon={faPlus}/>
        Create
      </button>
      </div>
  );
};

export { Staff };

