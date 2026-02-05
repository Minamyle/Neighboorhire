import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import RoleSelection from './pages/Auth/RoleSelection';
import ArtisanDiscovery from './pages/ArtisanDiscovery';
import ProfilePage from './pages/ServiceRequest/ProfilePage';
import RequestModal from './pages/ServiceRequest/RequestModal';
import JobStatusTimeline from './pages/ServiceRequest/JobStatusTimeline';
import Checkout from './pages/Payment/Checkout';
import CustomerDashboard from './pages/Payment/CustomerDashboard';
import ArtisanDashboard from './pages/Payment/ArtisanDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          {/* Student 1: Landing Page & Navigation */}
          <Route path="/" element={<LandingPage />} />

          {/* Student 2: Authentication & Role Flow */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/role-selection" element={<RoleSelection />} />

          {/* Student 3: Artisan Discovery */}
          <Route path="/artisans" element={<ArtisanDiscovery />} />

          {/* Student 4: Service Request & Job Flow */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/request-modal" element={<RequestModal isOpen={true} onClose={() => {}} artisan={{ name: 'Test Artisan' }} />} />
          <Route path="/jobs" element={<JobStatusTimeline />} />

          {/* Student 5: Payment & Dashboards */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/artisan-dashboard" element={<ArtisanDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
