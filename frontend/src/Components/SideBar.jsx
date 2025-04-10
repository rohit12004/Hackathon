import React from 'react';
import './SideBar.css';
import { FaTachometerAlt, FaUserGraduate, FaChartBar, FaCog } from 'react-icons/fa';

const SideBar = () => {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">Student Manager</h1>
      <nav className="nav-list">
        <NavItem icon={<FaTachometerAlt />} text="Dashboard" active />
        <NavItem icon={<FaUserGraduate />} text="Students" />
        <NavItem icon={<FaChartBar />} text="Reports" />
        <NavItem icon={<FaCog />} text="Settings" />
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, text, active }) => {
  return (
    <div className={`nav-item ${active ? 'active' : ''}`}>
      <span className="icon">{icon}</span>
      <span className="label">{text}</span>
    </div>
  );
};

export default SideBar;
