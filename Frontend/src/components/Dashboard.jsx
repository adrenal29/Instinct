import React, { useState } from 'react';
import firebase from 'firebase/compat/app'
import './css/dashboard.css';
import { FiMenu, FiMoon, FiSun, FiPieChart, FiDollarSign, FiUsers, FiSettings } from 'react-icons/fi';
import Work from './Work';
import Metamask from './Metamask';
import Meter from './Meter';
import Solar from './Solar';
import Front from './Front';
import Revenue from './Revenue';
import EnergyPrediction from './EnergyPrediction';
import Community from './Community/Community';
import CarbonFootprint from './CarbonFootprint/CarbonFootprint';
import ProfileComponent from './ProfileComponent';
function Dashboard() {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const tradeHistory = [100, 150, 80, 120, 200]; // Example trade history
  const consumptionHistory = [50, 60, 40, 55, 70]; // Example consumption history
  let content;
  switch (activeMenuItem) {
    case 'Dashboard':
      content = <Front />;
      break;
    case 'Meter':
      content = <Work />;
      break;
    case 'Simulate':
      content = <Meter />;
      break;
    case 'Settings':
      content = <ProfileComponent/>;
      break;
    case 'solar':
      content = <Solar />;
      break;
    case 'Revenue':
      content = <Revenue/>;
      break;
    case 'Prediction':
      content=<EnergyPrediction/>
      break;
    case 'Community':
      content=<Community/>
      break;
    case 'Eco Score':
      content=<CarbonFootprint tradeHistory={tradeHistory} consumptionHistory={consumptionHistory} />;
      break ;
    default:
      content = <h1>Invalid menu item</h1>;
  }

  const user = firebase.auth().currentUser;
  if (user != null)
    localStorage.setItem('user1', user.uid)
  const u = localStorage.getItem('user1')
  if (u) {
    // const userId = user.uid;
    console.log(`User UUID: ${u}`);
  } else {
    console.log('No user is currently signed in.');
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleMenuItemClick = (name) => {
    setActiveMenuItem(name);
  };

  const theme = isDarkMode
    ? { background: '#1c1c1c', sidebarBg: '#2d2d2d', sidebarText: '#ffffff', mainBg: '#1c1c1c', mainText: '#ffffff' }
    : { background: '#f0f0f0', sidebarBg: '#ffffff', sidebarText: '#2d2d2d', mainBg: '#ffffff', mainText: '#2d2d2d' };

  return (
    <div className="dashboard" style={{ backgroundColor: theme.background }}>

      <div className="sidebar" style={{ backgroundColor: theme.sidebarBg, color: theme.sidebarText }}>
        <div className="sidebar-header">Dashboard
          <div className="sidebar-theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </div>
        </div>
        <FiMenu className="sidebar-toggle" onClick={toggleSidebar} size={32} />
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${activeMenuItem === 'Dashboard' ? 'sidebar-menu-item-active' : ''}`}
            onClick={() => handleMenuItemClick('Dashboard')}
          >
            <FiPieChart className="sidebar-menu-item-icon" size={24} />
            <span className="sidebar-menu-item-text">Dashboard</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeMenuItem === 'Revenue' ? 'sidebar-menu-item-active' : ''}`}
            onClick={() => handleMenuItemClick('Revenue')}
          >
            <FiDollarSign className="sidebar-menu-item-icon" size={24} />
            <span className="sidebar-menu-item-text">Revenue</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeMenuItem === 'Meter' ? 'sidebar-menu-item-active' : ''}`}
            onClick={() => handleMenuItemClick('Meter')}
          >
            <FiUsers className="sidebar-menu-item-icon" size={24} />
            <span className="sidebar-menu-item-text">Add Meter</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeMenuItem === 'solar' ? 'sidebar-menu-item-active' : ''}`}
            onClick={() => handleMenuItemClick('solar')}
          >
            <FiUsers className="sidebar-menu-item-icon" size={24} />
            <span className="sidebar-menu-item-text">Generation</span>
          </li>

          <li
            className={`sidebar-menu-item ${activeMenuItem === 'Simulate' ? 'sidebar-menu-item-active' : ''}`}
            onClick={() => handleMenuItemClick('Simulate')}
          >
            <FiUsers className="sidebar-menu-item-icon" size={24} />
            <span className="sidebar-menu-item-text">Simulation</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeMenuItem === 'Prediction' ? 'sidebar-menu-item-active' : ''}`}
            onClick={() => handleMenuItemClick('Prediction')}
          >
            <FiUsers className="sidebar-menu-item-icon" size={24} />
            <span className="sidebar-menu-item-text">Energy Prediction</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeMenuItem === 'Community' ? 'sidebar-menu-item-active' : ''}`}
            onClick={() => handleMenuItemClick('Community')}
          >
            <FiUsers className="sidebar-menu-item-icon" size={24} />
            <span className="sidebar-menu-item-text">Community</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeMenuItem === 'Eco Score' ? 'sidebar-menu-item-active' : ''}`}
            onClick={() => handleMenuItemClick('Eco Score')}
          >
            <FiUsers className="sidebar-menu-item-icon" size={24} />
            <span className="sidebar-menu-item-text">Eco Score</span>
          </li>
          <li
            className={`sidebar-menu-item ${activeMenuItem === 'Settings' ? 'sidebar-menu-item-active' : ''}`}
            onClick={() => handleMenuItemClick('Settings')}
          >
            <FiSettings className="sidebar-menu-item-icon" size={24} />
            <span className="sidebar-menu-item-text">Settings</span>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Metamask />
        </div>
      </div>
      <div className="main" style={{ backgroundColor: theme.mainBg, color: theme.mainText }}>
        <div className="main-heading">{activeMenuItem}

        </div>
        {/* <div className="panel-container">
          {panels.map((panel, index) => (
            <div className="panel" key={index}>
              <div className="panel-title">{panel.title}</div>
              <div className="panel-content">{panel.content}</div>
            </div>
          ))}
        </div> */}
        {content}
      </div>
    </div>
  );
}

export default Dashboard;