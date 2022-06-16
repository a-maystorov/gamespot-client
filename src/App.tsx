import { Route, Routes, Navigate } from 'react-router-dom';

import Customers from './pages/Customers';
import Games from './pages/Games';
import Rentals from './pages/Rentals';

import NavBar from './components/NavBar';
import GameForm from './components/GameForm';

import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to={'/games'} />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GameForm />} />
          <Route path="/rentals" element={<Rentals />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
