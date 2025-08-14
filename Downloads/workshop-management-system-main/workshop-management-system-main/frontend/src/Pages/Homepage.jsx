import React from 'react';
import { useEffect } from 'react';
import { setupAutoLogout } from '../util/inactivityLogout'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';


function Homepage() {
  const navigate = useNavigate();
  const { username, setUsername } = useAuth();

  useEffect(() => {
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

        console.log(response)

        if (response.ok) {
          console.log("Logged out successfully");
        } else {
          console.error("Logout failed", await response.json());
        }

        setUsername(null);
        navigate('/login');
      } catch (error) {
        console.error("Auto logout failed:", error);
      }
    };

    setupAutoLogout(() => {
      toast.warn("You’ve been logged out due to inactivity.");
      handleLogout();
    });
  }, [navigate, username, setUsername]);


  return (
    <div>
      <h1 style={{ color: 'white' }}>Welcome to the Dashboard</h1>
      {/* Add dashboard cards/widgets here */}
    </div>
  );
};

export default Homepage;

