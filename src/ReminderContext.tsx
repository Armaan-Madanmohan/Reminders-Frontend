import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ReminderInfo } from './types/ReminderInfo';

interface ReminderContextType {
  reminders: ReminderInfo[];
  fetchReminders: () => Promise<void>;
  createReminder: (newReminder: Omit<ReminderInfo, 'id'>) => Promise<void>;
  updateReminder: (updatedReminder: ReminderInfo) => Promise<void>;
  deleteReminder: (id: number) => Promise<void>;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export const useReminderContext = () => {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error('useReminderContext must be used within a ReminderProvider');
  }
  return context;
};

interface ReminderProviderProps {
  children: ReactNode;
}

export const ReminderProvider: React.FC<ReminderProviderProps> = ({ children }) => {
  const [reminders, setReminders] = useState<ReminderInfo[]>([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch('https://localhost:7231/Reminder/');
      if (!response.ok) {
        throw new Error('Failed to fetch reminders');
      }
      const data = await response.json();
      setReminders(data);
    } catch (error) {
      console.error('Error fetching reminders', error);
    }
  };

  const createReminder = async (newReminder: Omit<ReminderInfo, 'id'>) => {
    try {
      console.log(JSON.stringify(newReminder));
      const response = await fetch('https://localhost:7231/Reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReminder)
      });
      if (!response.ok) {
        throw new Error('Failed to create reminder');
      }
      await fetchReminders(); // Refresh reminders after creation
    } catch (error) {
      console.error('Error creating reminder', error);
    }
  };

  const updateReminder = async (updatedReminder: ReminderInfo) => {
    try {
      const response = await fetch(`https://localhost:7231/Reminder/${updatedReminder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedReminder)
      });
      if (!response.ok) {
        throw new Error('Failed to update reminder');
      }
      await fetchReminders(); // Refresh reminders after update
    } catch (error) {
      console.error('Error updating reminder', error);
    }
  };

  const deleteReminder = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:7231/Reminder/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete reminder');
      }
      setReminders(reminders.filter(reminder => reminder.id !== id));
    } catch (error) {
      console.error('Error deleting reminder', error);
    }
  };

  return (
    <ReminderContext.Provider value={{ reminders, fetchReminders, createReminder, updateReminder, deleteReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};
