import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} — ${error.statusText}`;
    message =
      error.data?.message || "The requested resource could not be loaded.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-white px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-400 mb-8">{message}</p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
