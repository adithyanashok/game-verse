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

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/reviews", element: <ReviewsPage /> },
    { path: "/review/:id", element: <Review /> },
    { path: "/games", element: <GamesPage /> },
    { path: "/games/:id", element: <Game /> },
    { path: "/dashboard", element: <UserDashboard /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/profile/:userId", element: <ProfilePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/write-review/:id", element: <ReviewFormScreen mode="create" /> },
    { path: "/edit-review/:id", element: <ReviewFormScreen mode="edit" /> },
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
