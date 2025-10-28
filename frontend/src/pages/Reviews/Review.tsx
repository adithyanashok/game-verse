import React from "react";
import ResponsiveNavbar from "../../components/common/Navbar/ResponsiveNavbar";
import { dummy } from "../../data";
import RatingBreakdown from "./Components/RatingBreakdown";
import { GiThumbUp } from "react-icons/gi";
import { HiThumbUp } from "react-icons/hi";
import IconButton from "./Components/IconButton";
import { BiBookmark } from "react-icons/bi";
import Comment from "./Components/Comment";
import Footer from "../../components/common/footer/component/Footer";

const Review = () => {
  return (
    <>
      <ResponsiveNavbar />
      <div className="xl:px-70">
        <div className="shadow-lg px-5 md:p-10 mt-5 rounded-2xl">
          <h1 className="text-white font-bold text-2xl">Spider Man 2</h1>
          <div className="flex items-center gap-3 mt-5">
            <img
              className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-full"
              src={dummy[0].image}
              alt=""
            />
            <div>
              <h1 className="text-white font-bold text-[14px]">
                Adithyan Ashok
              </h1>
              <h1 className="text-[#989fab] text-[13px]">5 days ago</h1>
            </div>
          </div>
          <p className="text-[13px] md:text-[16px] leading-7 text-white mt-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum It is a long established
            fact that a reader will be distracted by the readable content of a
            page when looking at its layout. The point of using Lorem Ipsum is
            that it has a more-or-less normal distribution of letters, as
            opposed to using 'Content here, content here', making it look like
            readable English. Many desktop publishing packages and web page
            editors now use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover many web sites still in their
            infancy. Various versions have evolved over the years, sometimes by
            accident, sometimes on purpose (injected humour and the like)
          </p>
          <h1 className="text-white font-bold text-[16px] mt-5">
            Rating Breakdown
          </h1>
          <div>
            <RatingBreakdown />
          </div>
          <hr className="mt-6 border-[#989fab]" />
          <div className="flex gap-2 mt-5">
            <IconButton
              icon={<HiThumbUp color="#6711bf" className="" />}
              text="123"
            />
            <IconButton
              icon={<BiBookmark color="#6711bf" className="" />}
              text="123"
            />
          </div>
        </div>

        {/* Comments */}
        <div className="mt-10 px-2">
          <h1 className="text-white text-2xl font-bold">Comments</h1>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </>
  );
};

export default Review;
