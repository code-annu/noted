import { createBrowserRouter } from "react-router-dom";
import SignupPage from "./presentation/pages/auth/SignupPage";
import LoginPage from "./presentation/pages/auth/LoginPage";
import { HomePage } from "./presentation/pages/dashboard/HomePage";
import DashboardLayout from "./presentation/layouts/DashboardLayout";
import ProfilePage from "./presentation/pages/dashboard/ProfilePage";
import NotesPage from "./presentation/pages/dashboard/NotesPage";
import { NoteEditorPage } from "./presentation/pages/note/NoteEditorPage";
import { CollaborationsPage } from "./presentation/pages/dashboard/CollaborationsPage";

export enum AppRoute {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  NOTES = "/notes",
  COLLABORATIONS = "/collaborations",
}

export const appRouter = createBrowserRouter([
  {
    path: AppRoute.HOME,
    Component: DashboardLayout,
    children: [
      { index: true, Component: HomePage },
      { path: `${AppRoute.HOME}/:username`, Component: ProfilePage },
      { path: AppRoute.NOTES, Component: NotesPage },
      { path: AppRoute.COLLABORATIONS, Component: CollaborationsPage },
    ],
  },
  { path: AppRoute.SIGNUP, Component: SignupPage },
  { path: AppRoute.LOGIN, Component: LoginPage },
  { path: `${AppRoute.NOTES}/:noteId`, Component: NoteEditorPage },
]);
