import React from 'react';
import Sidebar from './Components/SideBar';
import Dashboard from './Components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
