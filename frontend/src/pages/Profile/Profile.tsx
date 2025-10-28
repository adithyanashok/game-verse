import React, { useState } from "react";
import ResponsiveNavbar from "../../components/common/Navbar/ResponsiveNavbar";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Reviews");

  const tabs = ["Reviews", "Bookmarks", "Activity"];
  const games = [
    { title: "Cyberpunk 2077", img: "https://i.imgur.com/0ZQXzYb.jpeg" },
    { title: "The Witcher 3", img: "https://i.imgur.com/x5BqkGz.jpeg" },
    { title: "Red Dead 2", img: "https://i.imgur.com/W0v2HhP.jpeg" },
    { title: "GTA V", img: "https://i.imgur.com/y4r1aU5.jpeg" },
    { title: "The Last of Us II", img: "https://i.imgur.com/Vq8MzoQ.jpeg" },
    { title: "AC: Valhalla", img: "https://i.imgur.com/xygBNBf.jpeg" },
  ];

  return (
    <>
      <ResponsiveNavbar />
      <div className="min-h-screen bg-primary text-white flex flex-col items-center py-10 px-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://i.imgur.com/8Km9tLL.png"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#2a1b45] shadow-lg"
          />
          <h2 className="text-2xl font-semibold mt-4">Alex Ryder</h2>
          <p className="text-gray-400 text-sm max-w-md mt-2">
            Avid gamer and tech enthusiast. Sharing my thoughts on the latest
            releases and hidden gems.
          </p>
          <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm">
            <span className="font-semibold text-white">1,234</span> followers ·{" "}
            <span className="font-semibold text-white">567</span> reviews
          </div>
          <button className="mt-5 px-6 py-2 rounded-full bg-[#6a0dad] hover:bg-[#7b26e4] transition font-medium shadow-md">
            Follow
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mt-10 border-b border-gray-700 w-full max-w-3xl justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium transition relative ${
                activeTab === tab
                  ? "text-[#b072ff]" // active tab color
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b072ff]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Game Cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 w-full max-w-5xl">
          {games.map((game, index) => (
            <div
              key={index}
              className="bg-[#1a102d] rounded-xl p-2 hover:scale-105 transition transform cursor-pointer shadow-lg"
            >
              <img
                src={game.img}
                alt={game.title}
                className="rounded-lg w-full h-44 object-cover"
              />
              <p className="mt-2 text-center text-sm text-gray-300">
                {game.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
