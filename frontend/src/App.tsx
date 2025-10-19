import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import HomePage from "./pages/Home/HomePages";
import ReviewsPage from "./pages/Reviews/ReviewsPage";
import Review from "./pages/Reviews/Review";
import GamesPage from "./pages/Games/GamesPage";
import Game from "./pages/Games/Game";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/reviews", element: <ReviewsPage /> },
    { path: "/reviews/:id", element: <Review /> },
    { path: "/games", element: <GamesPage /> },
    { path: "/games/:id", element: <Game /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
