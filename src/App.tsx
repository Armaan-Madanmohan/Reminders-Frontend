import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './Login';
import { Admin } from './Admin';
import { Staff } from './Staff';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={ <Login /> } 
        />
        /*<Route
          path="/admin"
          element={ <Admin /> }
        />*/
        <Route 
          path="/staff" 
          element={ <Staff /> }
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
