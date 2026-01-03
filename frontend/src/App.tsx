import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./utils/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import { Spinner } from "./components/common/Loader";

import HomePage from "./pages/Home/HomePages";
import ErrorPage from "./components/common/ErrorPage";
import NotFound from "./components/common/NotFound";
const ReviewsPage = lazy(() => import("./pages/Reviews/ReviewsPage"));
const Review = lazy(() => import("./pages/Reviews/ReviewScreen/Review"));
const GamesPage = lazy(() => import("./pages/Games/GamesPage"));
const Game = lazy(() => import("./pages/Games/Game"));
const UserDashboard = lazy(() => import("./pages/Dashboard/UserDashboard"));
const ProfilePage = lazy(() => import("./pages/Profile/Profile"));
const EditProfile = lazy(() => import("./pages/Profile/EditProfile"));
const ReviewFormScreen = lazy(() => import("./pages/Reviews/ReviewFormScreen"));

const DiscussionListScreen = lazy(
  () => import("./pages/Discussions/Discussions")
);
const CreateDiscussionScreen = lazy(
  () => import("./pages/Discussions/CreateDiscussion")
);
const DiscussionDetailScreen = lazy(
  () => import("./pages/Discussions/Discussion")
);

const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/Auth/SignupPage"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "*", element: <NotFound /> },
      { path: "/", element: <HomePage /> },
      { path: "/home", element: <HomePage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <UserDashboard /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/profile/:userId", element: <ProfilePage /> },
          { path: "/edit-profile/:userId", element: <EditProfile /> },
          {
            path: "/write-review/:id",
            element: <ReviewFormScreen mode="create" />,
          },
          {
            path: "/edit-review/:id",
            element: <ReviewFormScreen mode="edit" />,
          },
          { path: "/discussions", element: <DiscussionListScreen /> },
          { path: "/discussions/create", element: <CreateDiscussionScreen /> },
          { path: "/discussion/:id", element: <DiscussionDetailScreen /> },
        ],
      },
      { path: "/reviews", element: <ReviewsPage /> },
      { path: "/review/:id", element: <Review /> },
      { path: "/games", element: <GamesPage /> },
      { path: "/games/:id", element: <Game /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
]);

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center bg-primary">
            <Spinner />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>

      <ToastContainer hideProgressBar theme="dark" />
    </>
  );
}

export default App;
