import React from 'react';
import './SidePanel.css';

const SidePanel = ({ user, alerts }) => {
  return (
    <div className="side-panel">
      <div className="user-info">
        <div className="user-image">
          {/* maybe add image here or leave as initial idk */}
          <div className="user-initials">{user.name.charAt(0)}</div>
        </div>
        <div className="user-name">{user.name}</div>
      </div>
      <div className="alerts">
        <h4>
          Alerts <span className="alert-dot">.</span>{' '}
        </h4>
        {alerts.map((alert, index) => (
          <div key={index} className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidePanel;
