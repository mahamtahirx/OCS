import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './util/ProtectedRoute';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import PageLayout from './Components/Layout/PageLayout';
import Homepage from './Pages/Homepage';
import QRCodePage from './Pages/QRCodePage';
import SpareInventoryPage from './Pages/IMS/SpareInventoryPage';
import SpareCSS from './Pages/IMS/SpareCSS';
import SpareSub from './Pages/IMS/SpareSub';
import HRList from './Pages/HR/HRList';
import IssueSpareParts from './Pages/IMS/IssueSpareParts';

function App() {

  return (
    <>
      <ToastContainer />
      <Router>
      <Routes>
        {/* Redirect from the root to the signup page */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Route for Logged-in Users */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PageLayout />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/qrcode" element={<QRCodePage />} />
            {/* Inventory */}
            <Route path="/inventory-spare/all" element={<SpareInventoryPage/>} />
            <Route path="/inventory-spare/css" element={<SpareCSS/>} />
            <Route path="/inventory-spare/sub" element={<SpareSub/>} />
            <Route path="/inventory-spare/issue" element={<IssueSpareParts/>} />
            {/* Mechanic */}
            <Route path="/hr/list" element={<HRList/>} />
            {/* <Route path="/hr/attendance" element={<SpareSub/>} />
            <Route path="/hr/performance" element={<SpareSub/>} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
    </>
    
  );
}

export default App
