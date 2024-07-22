import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './Login';
// import { Admin } from './Admin';
import { Staff } from './Staff';
import { ReminderProvider } from './ReminderContext';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={ <Login /> } 
        />
        {/* <Route
          path="/admin"
          element={ <Admin /> }
        /> */}
        <Route 
          path="/staff" 
          element={ 
          <ReminderProvider><Staff /></ReminderProvider>
        }
        />
        <Route 
          path="/"
          /* if not logged in */
          element={ <Navigate to="/login" /> }
          /* else to staff/admin */
        />
      </Routes>
    </Router>
  )
}

export default App

// import React from 'react';
// import { ReminderProvider } from './ReminderContext';
// import { Staff } from './Staff';
// import './App.css';

// const App: React.FC = () => {
//   return (
//     <ReminderProvider>
//       <Staff />
//     </ReminderProvider>
//   );
// };

// export default App;