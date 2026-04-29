import React from "react";
import { BiSearch } from "react-icons/bi";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReviewSearchBar = ({ value, onChange }: Props) => (
  <div className="md:border rounded-2xl md:bg-dark md:border-[#989fab1e] md:p-5 p-2 md:m-4">
    <div className="flex items-center gap-2 bg-dark md:bg-primary p-3 rounded-[15px]">
      <BiSearch className="text-white text-2xl" />
      <input
        className="w-full bg-transparent text-white placeholder:text-gray-400 border-0 focus:outline-none"
        type="text"
        placeholder="Search for games or reviews"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default ReviewSearchBar;
