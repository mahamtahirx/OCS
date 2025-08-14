import { useRef, useState, useEffect } from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { useNotification } from '../../Context/NotificationContext';
import DropdownPortal from '../Layout/DropdownPortal';

const NotificationBell = () => {
  const { notifications, markAllAsRead } = useNotification();
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Prevent state update on render
  const prevShow = useRef(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !toggleRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      const rect = toggleRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + window.scrollY, right: window.innerWidth - rect.right });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  // When dropdown CLOSES, mark all as read
  useEffect(() => {
    if (prevShow.current === true && show === false) {
      markAllAsRead();
    }
    prevShow.current = show;
  }, [show]);


  return (
    <>
      <Dropdown show={false} align="end" style={{ overflow: 'visible' }}>
        <Dropdown.Toggle
          ref={toggleRef}
          variant="outline-success"
          id="notification-bell"
          className="position-relative d-flex align-items-center"
          style={{ overflow: 'visible' }}
          onClick={() => setShow((prev) => !prev)}
        >
          <FaBell size={20} />
          {unreadCount > 0 && (
            <Badge
              bg="danger"
              pill
              className="position-absolute top-0 start-100 translate-middle"
              style={{ zIndex: 2 }}
            >
              {unreadCount}
            </Badge>
          )}
        </Dropdown.Toggle>
      </Dropdown>

      {show && (
        <DropdownPortal>
          <div
            ref={dropdownRef}
            className="shadow border rounded"
            style={{
              position: 'absolute',
              top: `${coords.top}px`,
              right: `${coords.right}px`,
              minWidth: '300px',
              maxHeight: '400px',
              overflowY: 'auto',
              backgroundColor: '#fff',
              zIndex: 9999,
            }}
          >
            {notifications.length === 0 ? (
              <div className="text-muted text-center p-2">No notifications</div>
            ) : (
              notifications.map((notif, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 border-bottom ${
                    !notif.isRead ? 'bg-warning-subtle fw-bold' : ''
                  }`}
                >
                  {notif.message}
                </div>
              ))
            )}
          </div>
        </DropdownPortal>
      )}
    </>
  );
};

export default NotificationBell;
