import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SearchPage from './components/SearchPage';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} 
      />
      <Route 
        path="/search" 
        element={isAuthenticated ? <SearchPage /> : <Navigate to="/login" />} 
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
