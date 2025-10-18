import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import DesktopNavbar from "./components/common/DesktopNavbar";
import Footer from "./components/common/footer/component/Footer";
import MobileNavbar from "./components/common/MobileNavbar";
import HomePage from "./pages/Home/HomePages";
import ReviewsPage from "./pages/Reviews/ReviewsPage";
import ReactDOM from "react-dom/client";

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
  ]);
  const root = document.getElementById("root");

  ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
}

export default App;
