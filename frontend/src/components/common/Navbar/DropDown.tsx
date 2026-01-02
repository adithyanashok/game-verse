import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../features/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    <div className="mr-5">
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-1 bg-dark-purple px-2 py-1 rounded-full"
      >
        <FaUserCircle className="text-purple text-lg" />
        <MdArrowDropDown className="text-purple text-xl" />
      </button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
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
