import React from "react";

const NewsLetter = () => {
  return (
    <div className="p-5 md:p-10">
      <div className="bg-secondary w-full text-white flex flex-col gap-y-2 py-20 items-center rounded-[15px]">
        <h1 className="text-[18px] md:text-3xl font-bold ">
          Stay Updated with GameVerse
        </h1>
        <h1 className="text-[12px]">
          Get the latest reviews delivered to your inbox
        </h1>
        <div className="flex">
          <input
            className="text-[12px] bg-primary py-3 pl-2 pr-10 md:py-3 md:pl-4 md:pr-20 rounded-l-full border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
            type="email"
            placeholder="Your email address"
          />

          <div className="flex items-center justify-center bg-white rounded-r-full px-3 md:px-8">
            <p className="text-[12px] text-blue font-bold">Submit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
