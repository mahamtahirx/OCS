import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { GrHostMaintenance, GrSchedule } from "react-icons/gr";
import { SiSimpleanalytics } from "react-icons/si";
import { MdManageHistory,MdInventory } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";
import { BsQrCodeScan } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPeople } from "react-icons/io5";

const Sidebar = ({ isOpen, onClose }) => {
  const [dropdowns, setDropdowns] = useState({
      inventory: false,
      hr: false,
      // Add more dropdowns here
    });
  const sidebarRef = useRef(null);

  const toggleDropdown = (key) => {
    const isOpening = !dropdowns[key];

    if (isOpening) {
      setTimeout(() => {
        setDropdowns((prev) => ({ ...prev, [key]: true }));
      }, 200);
    } else {
      setDropdowns((prev) => ({ ...prev, [key]: false }));
    }
  };

  const anyDropdownOpen = Object.values(dropdowns).some(Boolean);

  //Close dropdown and collapse sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setDropdowns({});
      }
    };

    if (anyDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anyDropdownOpen]);

  return (
    <div
      ref={sidebarRef}
      onMouseLeave={() => {
        // Delay check slightly to allow state updates
        setTimeout(() => {
          const isAnyOpen = Object.values(dropdowns).some(Boolean);
          if (!isAnyOpen) {
            // Only collapse if all dropdowns are closed
            setDropdowns({});
          }
        }, 100);
      }}
      className={`sidebar ${isOpen ? 'open' : ''} ${anyDropdownOpen ? 'sidebar-expanded' : ''}`}
    >
      {/* Mobile-only brand header */}
      <div className="d-md-none sidebar-brand">
        <h5>WORKSHOP MANAGEMENT SYSTEM</h5>
      </div>

      <ul className="nav-list">
        <li>
          <Link to="/home" onClick={onClose}>
            <FaHome className="icon" />
            <span className="link-text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/maintenance" onClick={onClose}>
            <GrHostMaintenance className="icon" />
            <span className="link-text">Current Maint Ld</span>
          </Link>
        </li>
        <li>
          <Link to="/faultAnalysis" onClick={onClose}>
            <SiSimpleanalytics className="icon" />
            <span className="link-text">FTA</span>
          </Link>
        </li>
        <li>
          <Link to="/VheHistory" onClick={onClose}>
            <MdManageHistory className="icon" />
            <span className="link-text">Veh History</span>
          </Link>
        </li>
        <li>
          <Link to="/repair" onClick={onClose}>
            <GiAutoRepair className="icon" />
            <span className="link-text">Repair Activity</span>
          </Link>
        </li>
        <li>
          <Link to="/appts" onClick={onClose}>
            <GrSchedule className="icon" />
            <span className="link-text">Repair Appts</span>
          </Link>
        </li>
        <li>
          <Link to="/feedback" onClick={onClose}>
            <VscFeedback className="icon" />
            <span className="link-text">Feedback</span>
          </Link>
        </li>

        {/* Spare Parts Dropdown */}
        <li>
          <div className="dropdown-toggle" onClick={() => toggleDropdown('inventory')}>
            <MdInventory className="icon" />
            <span className="link-text">Spare Parts Inventory</span>
            <span className="arrow-icon">
              {dropdowns.inventory ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          {dropdowns.inventory && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/inventory-spare/all" onClick={onClose}>
                  View All Inventory
                </Link>
              </li>
              <li>
                <Link to="/inventory-spare/css" onClick={onClose}>
                  CSS Store
                </Link>
              </li>
              <li>
                <Link to="/inventory-spare/sub" onClick={onClose}>
                  Sub Store
                </Link>
              </li>
              <li>
                <Link to="/inventory-spare/issue" onClick={onClose}>
                  Issue Spare Parts
                </Link>
              </li>
              <li>
                <Link to="/inventory-spare/summary" onClick={onClose}>
                  Inventory Summary
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Mechanics Dropdown */}
        <li>
          <div className="dropdown-toggle" onClick={() => toggleDropdown('hr')}>
            <IoPeople className="icon" />
            <span className="link-text">Human Resources</span>
            <span className="arrow-icon">
              {dropdowns.hr ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          {dropdowns.hr && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/hr/list" onClick={onClose}>
                  HR List
                </Link>
              </li>
              <li>
                <Link to="/hr/attendance" onClick={onClose}>
                  HR Attendance
                </Link>
              </li>
              <li>
                <Link to="/hr/performance" onClick={onClose}>
                  HR Performance
                </Link>
              </li>
              <li>
                <Link to="/hr/summary" onClick={onClose}>
                  HR Work Summary
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* QR Generation */}
        <li>
          <Link to="/qrcode" onClick={onClose}>
            <BsQrCodeScan className="icon" />
            <span className="link-text">Generate QR Code</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
