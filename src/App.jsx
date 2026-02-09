import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPageLayout from "./layouts/IndexPageLayout";
import LandingPage from "./pages/LandingPage";
import ArtisanDiscovery from "./pages/ArtisanDiscovery";
import Login from "./auth/login";
import Register from "./auth/register";
import ArtisanDashboard from "./dashboard/Artisan-Dashboard";
import ArtisanJobs from "./pages/ArtisanJobs";
import ArtisanDashboardOverview from "./pages/ArtisanDashboardOverview";
import Earnings from "./pages/Earnings";
import Ratings from "./pages/Ratings";
import CustomerDashboard from "./dashboard/Customer-Dashboard";
import CustomerDashboardOverview from "./pages/CustomerDashboardOverview";
import CustomerProfile from "./pages/CustomerProfile";
import JobHistory from "./pages/CustomerJobHistory";
import Checkout from "./pages/checkout";
import NotFoundPage from "./pages/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<IndexPageLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/artisans" element={<ArtisanDiscovery />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>

        {/* Artisan Dashboard */}
        <Route path="/dashboard/artisan" element={<ArtisanDashboard />}>
          <Route index element={<ArtisanDashboardOverview />} />
          <Route path="jobs" element={<ArtisanJobs />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="ratings" element={<Ratings />} />
        </Route>

        {/*Ccustomer Dashboard  */}
        <Route path="/dashboard/customer" element={<CustomerDashboard />}>
          <Route index element={<CustomerDashboardOverview />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="jobs" element={<JobHistory />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* The 404 Route MUST be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
