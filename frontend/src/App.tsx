import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./utils/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import { RouteSkeleton } from "./components/common/Loader";
import ErrorPage from "./components/common/ErrorPage";
import NotFound from "./components/common/NotFound";
import Review from "./pages/Reviews/ReviewScreen/Review";
const HomePage = lazy(() => import("./pages/Home/HomePages"));
const ReviewsPage = lazy(() => import("./pages/Reviews/ReviewsListScreen"));
// const Review = lazy(() => import("./pages/Reviews/ReviewScreen/Review"));
const GamesPage = lazy(() => import("./pages/Games/GamesListScreen"));
const Game = lazy(() => import("./pages/Games/GameScreen"));
const UserDashboard = lazy(() => import("./pages/Dashboard/UserDashboard"));
const ProfilePage = lazy(() => import("./pages/Profile/Profile"));
const EditProfile = lazy(() => import("./pages/Profile/EditProfile"));
const ReviewFormScreen = lazy(() => import("./pages/Reviews/ReviewFormScreen"));

const DiscussionListScreen = lazy(
  () => import("./pages/Discussions/Discussions"),
);
const CreateDiscussionScreen = lazy(
  () => import("./pages/Discussions/CreateDiscussion"),
);
const DiscussionDetailScreen = lazy(
  () => import("./pages/Discussions/Discussion"),
);

const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/Auth/SignupPage"));

const withRouteBoundary = (element: ReactNode, title = "Loading page...") => (
  <Suspense fallback={<RouteSkeleton title={title} />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "*", element: <NotFound /> },
      {
        path: "/",
        element: withRouteBoundary(<HomePage />, "Loading home..."),
      },
      {
        path: "/home",
        element: withRouteBoundary(<HomePage />, "Loading home..."),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: withRouteBoundary(
              <UserDashboard />,
              "Loading dashboard...",
            ),
          },
          {
            path: "/profile",
            element: withRouteBoundary(<ProfilePage />, "Loading profile..."),
          },
          {
            path: "/profile/:userId",
            element: withRouteBoundary(<ProfilePage />, "Loading profile..."),
          },
          {
            path: "/edit-profile/:userId",
            element: withRouteBoundary(<EditProfile />, "Loading editor..."),
          },
          {
            path: "/write-review/:id",
            element: withRouteBoundary(
              <ReviewFormScreen mode="create" />,
              "Loading review form...",
            ),
          },
          {
            path: "/edit-review/:id",
            element: withRouteBoundary(
              <ReviewFormScreen mode="edit" />,
              "Loading review form...",
            ),
          },
          {
            path: "/discussions",
            element: withRouteBoundary(
              <DiscussionListScreen />,
              "Loading discussions...",
            ),
          },
          {
            path: "/discussions/create",
            element: withRouteBoundary(
              <CreateDiscussionScreen />,
              "Loading composer...",
            ),
          },
          {
            path: "/discussion/:id",
            element: withRouteBoundary(
              <DiscussionDetailScreen />,
              "Loading discussion...",
            ),
          },
        ],
      },
      {
        path: "/reviews",
        element: withRouteBoundary(<ReviewsPage />, "Loading reviews..."),
      },
      {
        path: "/review/:id",
        element: (
          // withRouteBoundary(
          <Review />
        ),
        // , "Loading review..."),
      },
      {
        path: "/games",
        element: withRouteBoundary(<GamesPage />, "Loading games..."),
      },
      {
        path: "/games/:id",
        element: withRouteBoundary(<Game />, "Loading game..."),
      },
    ],
  },
  {
    path: "/login",
    element: withRouteBoundary(<LoginPage />, "Loading sign in..."),
  },
  {
    path: "/signup",
    element: withRouteBoundary(<SignupPage />, "Loading sign up..."),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer hideProgressBar theme="dark" />
    </>
  );
}

export default App;
