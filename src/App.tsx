import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import SplashScreen from "@/pages/SplashScreen";
import Landing from "@/pages/Landing";
import CustomerLogin from "@/pages/CustomerLogin";
import CustomerHome from "@/pages/CustomerHome";
import AdminLogin from "@/pages/AdminLogin";
import AdminPanel from "@/pages/AdminPanel";
import SuperAdminLogin from "@/pages/SuperAdminLogin";
import WasherLogin from "@/pages/WasherLogin";
import WasherDashboard from "@/pages/WasherDashboard";
import DeliveryLogin from "@/pages/DeliveryLogin";
import DeliveryDashboard from "@/pages/DeliveryDashboard";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/customer-home" element={<CustomerHome />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/super-admin-login" element={<SuperAdminLogin />} />
        <Route path="/washer-login" element={<WasherLogin />} />
        <Route path="/washer-dashboard" element={<WasherDashboard />} />
        <Route path="/delivery-login" element={<DeliveryLogin />} />
        <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
