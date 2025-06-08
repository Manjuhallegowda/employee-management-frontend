import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EmployeeListPage from './pages/EmployeeListPage.jsx';
import AddEmployeePage from './pages/AddEmployeePage.jsx';
import EditEmployeePage from './pages/EditEmployeePage.jsx';
import { isTokenValid } from './utils/tokenUtils.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid());

  useEffect(() => {
    const handleStorageChange = () => setIsAuthenticated(isTokenValid());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTokenValid()) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/employees" element={isAuthenticated ? <EmployeeListPage /> : <Navigate to="/" />} />
        <Route path="/add-employee" element={isAuthenticated ? <AddEmployeePage /> : <Navigate to="/" />} />
        <Route path="/edit-employee/:id" element={isAuthenticated ? <EditEmployeePage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;