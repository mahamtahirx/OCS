import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../Layout/Navbar';
import Sidebar from '../Layout/SideBar';

const PageLayout = () => {
const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

      <div className="app-container">
        <NavigationBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content-container">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
          />
          <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <Outlet /> {/* this loads the inner page */}
          </main>
        </div>
      </div>
    </>
  );
};

export default PageLayout;