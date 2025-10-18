import React from "react";
import { BiChevronDown } from "react-icons/bi";

type Props = {
  selectedValue: string;
  onChange: (value: string) => void;
};

const DropDown: React.FC<Props> = ({ selectedValue, onChange }) => {
  return (
    <div className="relative inline-block mt-5">
      <select
        id="my-dropdown"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none p-1 pl-2 md:p-2 md:pr-10 rounded-full bg-dark-purple text-[var(--color-purple)] text-[12px] font-bold outline-none cursor-pointer"
      >
        <option value="option1" disabled>
          Genre
        </option>
        <option value="action">Action</option>
        <option value="adventure">Adventure</option>
      </select>

      <BiChevronDown
        size={16}
        className="absolute right-2 mr-[4px] top-1/2 -translate-y-1/2 text-[#6711bf] pointer-events-none"
      />
    </div>
  );
};

export default DropDown;
