import React from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);
  const reconnectIntervalRef = useRef(null);

  const connectWebSocket = () => {
    const socket = new WebSocket(`ws://${window.location.hostname}:28000/ws/notifications/`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
      if (reconnectIntervalRef.current) {
        clearInterval(reconnectIntervalRef.current);
        reconnectIntervalRef.current = null;
      }
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newNotification = data.notifications;

      setNotifications((prev) => {
        const prevMap = new Map(prev.map(n => [n.id, n]));

        return newNotification.map(n => ({
          ...n,
          isRead: prevMap.has(n.id) ? prevMap.get(n.id).isRead : false,
        }));
      });
    };

    socket.onclose = () => {
      console.warn('WebSocket disconnected. Attempting to reconnect...');
      attemptReconnect();
    };

    socket.onerror = (error) => {
      console.error('WebSocket error', error);
      socket.close();
    };
  };

  const attemptReconnect = () => {
    if (reconnectIntervalRef.current) return;

    reconnectIntervalRef.current = setInterval(() => {
      console.log('Trying to reconnect WebSocket...');
      connectWebSocket();
    }, 3000); // Retry every 3 seconds
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) socketRef.current.close();
      if (reconnectIntervalRef.current) clearInterval(reconnectIntervalRef.current);
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, markAllAsRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

