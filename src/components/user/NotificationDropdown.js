// NotificationDropdown.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/user/NotificationDropdown.scss';

const NotificationDropdown = ({ notifications, isOpen }) => {
  const [userId] = useState(localStorage.getItem('id'));

  useEffect(() => {
    // Placeholder for any additional logic when notifications update
  }, [notifications]);

  if (!isOpen) {
    console.log("Dropdown is closed.");
    return null;
  }

  return (
    <ul className="notification-dropdown">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <li key={index}>
            <strong>{notification.title}</strong>
            <p>{notification.body}</p>
            <span>{notification.date}</span>
          </li>
        ))
      ) : (
        <li className="no-notifications">No new notifications</li>
      )}
    </ul>
  );
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default NotificationDropdown;
