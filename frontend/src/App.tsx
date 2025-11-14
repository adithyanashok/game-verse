import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import HomePage from "./pages/Home/HomePages";
import ReviewsPage from "./pages/Reviews/ReviewsPage";
import Review from "./pages/Reviews/Review";
import GamesPage from "./pages/Games/GamesPage";
import Game from "./pages/Games/Game";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import ProfilePage from "./pages/Profile/Profile";
import Footer from "./components/common/footer/component/Footer";
import ResponsiveNavbar from "./components/common/Navbar/ResponsiveNavbar";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import WriteReviewScreen from "./pages/Reviews/WriteReview";

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
    { path: "/write-review/:id", element: <WriteReviewScreen /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
