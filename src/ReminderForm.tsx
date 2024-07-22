import React, { useState } from 'react';
import { ReminderInfo } from './types/ReminderInfo';
import './Reminder.css';
import { useReminderContext } from './ReminderContext';
import './ReminderForm.css';

interface ReminderFormProps {
  reminder?: ReminderInfo;
  onClose: () => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ reminder, onClose}) => {
  const [formState, setFormState] = useState<ReminderInfo>(() => reminder ?? {id: 0, title: '', description: '', deadline: '', interval: 1, userId: "5"});
  const { createReminder, updateReminder } = useReminderContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (reminder) {
      await updateReminder(formState);
    } else {
      await createReminder(formState);
    }
    onClose();
  };

  const day = formState.interval !== 1 ? 'days' : 'day';

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{reminder ? 'Update' : 'Create'} Reminder</h2>
        <form>
          <label>Title:</label>
          <input type="text" name="title" value={formState.title} onChange={handleInputChange} />
          <label>Description:</label>
          <input type="text" name="description" value={formState.description} onChange={handleInputChange} />
          <label>Deadline (DD/MM/YYYY):</label>
          <input type="text" name="deadline" value={formState.deadline} onChange={handleInputChange} />
          <label>Interval:</label>
          <input type="text" name="interval" value={formState.interval.toString()} onChange={handleInputChange} />
          <button type="button" className="update-create-button" onClick={handleSubmit}>{reminder ? 'Update' : 'Create'}</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export { ReminderForm };
