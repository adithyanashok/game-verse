import { MdErrorOutline } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-white px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <MdErrorOutline className="text-purple-500 w-20 h-20" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4">404</h1>

        {/* Subtitle */}
        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>

        {/* Description */}
        <p className="text-gray-400 mb-8">
          The page you’re looking for doesn’t exist or was moved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
