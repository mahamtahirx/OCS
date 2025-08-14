
import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../src/Context/NotificationContext';

// Dummy component to test context values
const TestComponent = () => {
  const { notifications, markAllAsRead, unreadCount } = useNotification();

  return (
    <div>
      <p data-testid="unread-count">{unreadCount}</p>
      <button onClick={markAllAsRead}>Mark All Read</button>
      <div data-testid="notifications">{JSON.stringify(notifications)}</div>
    </div>
  );
};

describe('NotificationContext', () => {
  it('provides default values and renders children', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Check unread count is initially 0
    expect(screen.getByTestId('unread-count').textContent).toBe("0");

    // Notifications list is initially empty
    expect(screen.getByTestId('notifications').textContent).toBe("[]");
  });
});
