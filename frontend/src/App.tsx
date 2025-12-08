import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import HomePage from "./pages/Home/HomePages";
import ReviewsPage from "./pages/Reviews/ReviewsPage";
import Review from "./pages/Reviews/ReviewScreen/Review";
import GamesPage from "./pages/Games/GamesPage";
import Game from "./pages/Games/Game";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import ProfilePage from "./pages/Profile/Profile";
import Footer from "./components/common/footer/component/Footer";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ReviewFormScreen from "./pages/Reviews/ReviewFormScreen";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },

    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reviews",
      element: (
        <ProtectedRoute>
          <ReviewsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/review/:id",
      element: (
        <ProtectedRoute>
          <Review />
        </ProtectedRoute>
      ),
    },
    {
      path: "/games",
      element: (
        <ProtectedRoute>
          <GamesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/games/:id",
      element: (
        <ProtectedRoute>
          <Game />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/write-review/:id",
      element: (
        <ProtectedRoute>
          <ReviewFormScreen mode="create" />
        </ProtectedRoute>
      ),
    },
    {
      path: "/edit-review/:id",
      element: (
        <ProtectedRoute>
          <ReviewFormScreen mode="edit" />
        </ProtectedRoute>
      ),
    },

    // Public Auth Routes
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer hideProgressBar theme="dark" />
      <Footer />
    </>
  );
}

export default App;
