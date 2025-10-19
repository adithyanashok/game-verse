import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import DesktopNavbar from "./components/common/Navbar/DesktopNavbar";
import Footer from "./components/common/footer/component/Footer";
import MobileNavbar from "./components/common/Navbar/MobileNavbar";
import HomePage from "./pages/Home/HomePages";
import ReviewsPage from "./pages/Reviews/ReviewsPage";
import ReactDOM from "react-dom/client";
import Review from "./pages/Reviews/Review";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/reviews",
      element: <ReviewsPage />,
    },
    {
      path: "/reviews/:id",
      element: <Review />,
    },
  ]);
  const root = document.getElementById("root");

  ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
}

export default App;
