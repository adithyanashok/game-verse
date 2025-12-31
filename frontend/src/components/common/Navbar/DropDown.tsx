import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { logout } from "../../../features/auth/authSlice";

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.auth.user);

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
    <div>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 bg-dark-purple lg:px-1 lg:pr-2 md:py-1 rounded-full cursor-pointer lg:mr-3"
      >
        {/* Avatar */}
        <div className="w-8 h-8 lg:w-10 lg:h-10">
          <img
            src={`https://${authUser?.profileImage}`}
            alt="User"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Name hidden on small screens */}
        <p className="text-purple font-semibold text-[14px] hidden lg:block">
          {authUser?.name}
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
