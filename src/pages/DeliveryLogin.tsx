import StaffAuth from "@/components/staff/StaffAuth";

const DeliveryLogin = () => (
  <StaffAuth
    role="delivery_boy"
    title="Delivery Staff Login"
    loginPath="/delivery-login"
    dashboardPath="/delivery-dashboard"
  />
);

export default DeliveryLogin;
