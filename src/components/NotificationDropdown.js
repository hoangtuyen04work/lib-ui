import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/NotificationDropdown.scss'; // Tạo file SCSS cho component này nếu cần
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';  // Updated import
const NotificationDropdown = ({ isOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('id'))
  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = new SockJS('http://localhost:8087/notify/notify/websocket', null, {
      withCredentials: true
    });
  
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      onConnect: (frame) => {
        client.subscribe(`/notify/receiver/${userId}`, (response) => {
          const notificationReceive = JSON.parse(response.body);
          console.log("notificationReceive", notificationReceive);
          setNotifications((notifications) => [...notifications, notificationReceive]);
        });
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers['message']}`);
        console.error(`Additional details: ${frame.body}`);
      }
    });
  
    client.activate();
    setStompClient(client);
    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);
  

  if (!isOpen) return null; // Nếu dropdown không mở thì không render gì cả
  return (
    <ul className="notification-dropdown">
      {notifications.map((notification, index) => (
        <li key={index}>
          {notification}
        </li>
      ))}
    </ul>
  );
};

NotificationDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default NotificationDropdown;
