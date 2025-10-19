import React, { type ReactNode } from "react";
import { HiThumbUp } from "react-icons/hi";
type Props = {
  text: string;
  icon: ReactNode;
};
const IconButton = ({ icon, text }: Props) => {
  return (
    <div className="flex items-center bg-dark-purple px-3 py-2 rounded-[15px] gap-2 mb-5">
      {icon}
      <p className="text-purple font-bold text-[12px]">{text}</p>
    </div>
  );
};

export default IconButton;
