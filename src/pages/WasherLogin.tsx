import StaffAuth from "@/components/staff/StaffAuth";

const WasherLogin = () => (
  <StaffAuth
    role="staff"
    title="Washing Agent Login"
    loginPath="/washer-login"
    dashboardPath="/washer-dashboard"
  />
);

export default WasherLogin;
