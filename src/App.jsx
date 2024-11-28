import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './components/pages/Inicio';
import Login from './components/pages/Login1';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
}
