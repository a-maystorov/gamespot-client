import { Route, Routes, Navigate } from 'react-router-dom';

import Customers from './pages/Customers';
import Games from './pages/Games';
import Rentals from './pages/Rentals';

import NavBar from './components/NavBar';
import GameForm from './components/GameForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import './App.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const jwt = localStorage.getItem('authToken');
    if (jwt) setUser(jwtDecode(jwt));
  }, []);

  return (
    <>
      <NavBar user={user!} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to={'/games'} />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GameForm />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
