import { useState } from "react";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("reviews");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen ">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-primary shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">ReviewHub</h1>
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-6 py-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main
            </h2>
          </div>

          <ul className="mt-2">
            <li>
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                  activeSection === "dashboard"
                    ? " text-white border-r-2 border-purple-500"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveSection("reviews")}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                  activeSection === "reviews"
                    ? " text-white border-r-2 border-purple-500"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                My Reviews
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveSection("analytics")}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                  activeSection === "analytics"
                    ? " text-white border-r-2 border-purple-500"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Analytics
              </button>
            </li>
          </ul>

          <div className="px-6 py-3 mt-8">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Account
            </h2>
          </div>

          <ul className="mt-2">
            <li>
              <button className="w-full flex items-center px-6 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </button>
            </li>

            <li>
              <button className="w-full flex items-center px-6 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto ">
        {/* Mobile Header */}
        <div className="lg:hidden bg-primary p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">ReviewHub</h1>
            <div className="w-6"></div> {/* Spacer for balance */}
          </div>
        </div>

        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              My Reviews
            </h1>
            <p className="text-gray-300 mt-2">
              Manage and view your book reviews
            </p>
          </div>

          {/* Published Section */}
          <div>
            <h2 className="text-lg lg:text-xl font-semibold text-white mb-4 lg:mb-6">
              Published
            </h2>

            {/* Review 1 */}
            <div className="bg-primary rounded-lg shadow-lg p-4 lg:p-6 mb-4">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-base lg:text-lg font-semibold text-white">
                    Review of 'Mystic Realms'
                  </h3>
                  <p className="text-gray-300 mt-1 text-sm lg:text-base">
                    Published on June 20, 2024
                  </p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full lg:w-auto text-center">
                  View Review
                </button>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-primary rounded-lg shadow-lg p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-base lg:text-lg font-semibold text-white">
                    Review of 'Cyberpunk City'
                  </h3>
                  <p className="text-gray-300 mt-1 text-sm lg:text-base">
                    Published on May 10, 2024
                  </p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full lg:w-auto text-center">
                  View Review
                </button>
              </div>
            </div>
          </div>

          {/* Drafts Section for Mobile - Added based on original design */}
          <div className="mt-8 lg:hidden">
            <h2 className="text-lg font-semibold text-white mb-4">Drafts</h2>
            <div className="bg-primary rounded-lg shadow-lg p-4">
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white">
                    Review of 'Cosmic Odyssey'
                  </h3>
                  <p className="text-gray-300 mt-1 text-sm">
                    Drafted on July 15, 2024
                  </p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full text-center">
                  Continue Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
