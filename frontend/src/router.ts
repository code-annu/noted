import { createBrowserRouter } from "react-router-dom";
import HomePage from "./presentation/pages/dashboard/HomePage";
import LoginPage from "./presentation/pages/auth/LoginPage";
import SignupPage from "./presentation/pages/auth/SignupPage";
import DashboardLayout from "./presentation/layouts/DashboardLayout";
import ProfilePage from "./presentation/pages/dashboard/ProfilePage";
import NotesPage from "./presentation/pages/dashboard/NotesPage";
import EditNotePage from "./presentation/pages/dashboard/EditNotePage";

export enum AppRoute {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  NOTES = "/notes",
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
      { path: AppRoute.NOTES, Component: NotesPage },
      { path: `${AppRoute.NOTES}/:noteId`, Component: EditNotePage },
    ],
  },
  { path: AppRoute.SIGNUP, Component: SignupPage },
  { path: AppRoute.LOGIN, Component: LoginPage },
]);
