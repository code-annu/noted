import { createBrowserRouter } from "react-router-dom";
import HomePage from "./presentation/pages/dashboard/HomePage";
import LoginPage from "./presentation/pages/auth/LoginPage";
import SignupPage from "./presentation/pages/auth/SignupPage";
import DashboardLayout from "./presentation/layouts/DashboardLayout";
import ProfilePage from "./presentation/pages/dashboard/ProfilePage";

export enum AppRoute {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
}

export const appRouter = createBrowserRouter([
  {
    path: AppRoute.HOME,
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/:username",
        Component: ProfilePage,
      },
    ],
  },
  { path: AppRoute.SIGNUP, Component: SignupPage },
  { path: AppRoute.LOGIN, Component: LoginPage },
]);
