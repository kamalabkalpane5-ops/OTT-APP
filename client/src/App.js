import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Player from './pages/Player';
import MyList from './pages/MyList';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error('Error fetching user:', err);
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <Router>
      {token && <Header user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route path="/" element={token ? <Home token={token} /> : <Navigate to="/login" />} />
        <Route path="/browse" element={token ? <Browse token={token} /> : <Navigate to="/login" />} />
        <Route path="/player/:id" element={token ? <Player token={token} /> : <Navigate to="/login" />} />
        <Route path="/mylist" element={token ? <MyList token={token} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
