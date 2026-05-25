import { createBrowserRouter } from "react-router";
import { Splash } from "./pages/Splash";
import { Onboarding } from "./pages/Onboarding";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { MainLayout } from "./pages/MainLayout";
import { Home } from "./pages/Home";
import { DoctorList } from "./pages/DoctorList";
import { DoctorProfile } from "./pages/DoctorProfile";
import { AppointmentScheduling } from "./pages/AppointmentScheduling";
import { AppointmentConfirmation } from "./pages/AppointmentConfirmation";
import { Appointments } from "./pages/Appointments";
import { Records } from "./pages/Records";
import { MedicalHistory } from "./pages/MedicalHistory";
import { Profile } from "./pages/Profile";
import { Notifications } from "./pages/Notifications";
import { Messages } from "./pages/Messages";

export const router = createBrowserRouter([
  { path: "/", Component: Splash },
  { path: "/onboarding", Component: Onboarding },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/forgot-password", Component: ForgotPassword },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "doctors", Component: DoctorList },
      { path: "appointments", Component: Appointments },
      { path: "records", Component: Records },
      { path: "history", Component: MedicalHistory },
      { path: "notifications", Component: Notifications },
      { path: "profile", Component: Profile },
      { path: "messages", Component: Messages },
      { path: "schedule", Component: AppointmentScheduling },
      { path: "confirmation", Component: AppointmentConfirmation },
    ],
  },
  { path: "/app/doctors/:id", Component: DoctorProfile },
]);
