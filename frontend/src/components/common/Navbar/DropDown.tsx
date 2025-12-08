import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../features/auth/authSlice";

interface Props {
  userImage: string;
  userName: string;
}
const UserDropdown = ({ userImage, userName }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-3 bg-dark-purple lg:px-2 md:py-1 rounded-full cursor-pointer lg:mr-2"
      >
        {/* Avatar */}
        <div className="w-8 h-8 lg:w-10 lg:h-10">
          <img
            src={userImage}
            alt="User"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Name hidden on small screens */}
        <p className="text-purple font-semibold text-[14px] hidden lg:block">
          {userName}
        </p>
      </button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/profile" className="w-full block">
            Profile
          </Link>
        </MenuItem>

        <MenuItem onClick={handleLogout} className="text-red-500">
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserDropdown;
