import React from 'react';
import PropTypes from 'prop-types';
import '../styles/NotificationDropdown.scss'; // Tạo file SCSS cho component này nếu cần

const NotificationDropdown = ({ notifications, isOpen, onNotificationClick }) => {
  if (!isOpen) return null; // Nếu dropdown không mở thì không render gì cả

  return (
    <ul className="notification-dropdown">
      {notifications.map((notification, index) => (
        <li key={index} onClick={() => onNotificationClick(notification)}>
          {notification}
        </li>
      ))}
    </ul>
  );
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onNotificationClick: PropTypes.func.isRequired,
};

export default NotificationDropdown;
