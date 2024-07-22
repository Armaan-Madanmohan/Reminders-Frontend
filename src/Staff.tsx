import React, { useState } from 'react';
import { Reminder } from './Reminder';
import { useReminderContext } from './ReminderContext';
import { ReminderForm } from './ReminderForm';
import './Staff.css';

const Staff: React.FC = () => {
  const { reminders } = useReminderContext();
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="staff-container">
      <h1 style={{color: "black"}}>Reminders</h1>
      <button className="create-button" onClick={() => setShowCreateForm(true)}>Create</button>
      <ul className="reminder-list">
        {reminders.map((reminder) => (
          <Reminder key={reminder.id} reminderInfo={reminder} />
        ))}
      </ul>
      {showCreateForm && <ReminderForm onClose={() => setShowCreateForm(false)} />}
    </div>
  );
};

export { Staff };
