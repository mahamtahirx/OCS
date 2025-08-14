import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Button, Container, Navbar } from 'react-bootstrap';
import { GiHamburgerMenu } from "react-icons/gi";
import NotificationBell from './NotificationBell';


const NavigationBar = ({toggleSidebar}) => {
  const navigate = useNavigate();
  const { username, setUsername } = useAuth();

  const handleLogout = async () => {
    if (!username) {
      console.error("Username not found");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:28000/Users/logout/", {
        method: "POST",
        credentials: "include",
      });
  
      if (response.ok) {
        console.log("Logged out successfully");
        setUsername(null);
        navigate("/login");
      } else {
        console.error("Logout failed", await response.json());
      }
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <Navbar className="bg-body-tertiary sticky-top py-2" style={{ overflow: 'visible', zIndex: 1040 }}>
      <Container fluid style={{ paddingTop: '10px' }}>
        <div className="d-flex justify-content-between align-items-center w-100" style={{ overflow: 'visible' }}>

          {/* Left - Hamburger Menu (mobile only) */}
          <div className="d-md-none hamburger-menu">
            <GiHamburgerMenu size={24} 
              onClick={toggleSidebar}
              style={{ cursor: 'pointer', color: 'black'}}
              aria-label="Toggle sidebar"
              role="button"
              tabIndex={0}
              />
          </div>

          {/* Left - Brand */}
          <Navbar.Brand className="mb-0 d-none d-md-block">WMS</Navbar.Brand>

          {/* Center - Username */}
          <div className="mx-auto text-center" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            <Navbar.Text className="mb-0">
              Signed in as: <strong><u>{username}</u></strong>
            </Navbar.Text>
          </div>

          {/* Right: Notification + Logout */}
          <div className="d-flex align-items-center gap-3" style={{ paddingTop: "10px" }}>
            <NotificationBell />

            <Button variant="outline-success" style={{ width: "90px" }} onClick={handleLogout}>
              Logout
            </Button>
          </div>

        </div>
      </Container>
    </Navbar>
    
  );
};

NavigationBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default NavigationBar;
