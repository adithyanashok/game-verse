import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../features/auth/authSlice";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

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
    <div>
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.14)] bg-[#0d1424] px-3 py-2 text-sm font-bold text-white transition hover:border-[rgba(0,212,255,0.34)] hover:bg-[#121a2c]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-lime)] text-[#07101a]">
          <FiUser className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">Account</span>
        <FiChevronDown
          className={`h-4 w-4 text-[#aeb7c8] transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 180,
              color: "#ffffff",
              border: "1px solid rgba(0,212,255,0.16)",
              borderRadius: "8px",
              backgroundColor: "rgba(7, 11, 22, 0.96)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 20px 45px rgba(0,0,0,0.32)",
            },
          },
          list: {
            sx: { p: 0.75 },
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            borderRadius: "6px",
            fontSize: 14,
            fontWeight: 700,
            gap: 1.25,
            "&:hover": { backgroundColor: "rgba(0,212,255,0.1)" },
          }}
        >
          <FiUser className="h-4 w-4" />
          <Link to="/profile" className="block w-full">
            Profile
          </Link>
        </MenuItem>

        <MenuItem
          onClick={handleLogout}
          sx={{
            borderRadius: "6px",
            color: "#f87171",
            fontSize: 14,
            fontWeight: 700,
            gap: 1.25,
            "&:hover": { backgroundColor: "rgba(248,113,113,0.12)" },
          }}
        >
          <FiLogOut className="h-4 w-4" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserDropdown;
