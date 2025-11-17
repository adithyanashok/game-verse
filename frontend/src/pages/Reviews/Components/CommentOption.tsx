import { useState, useRef, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

interface OptionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const OptionsMenu = ({ onEdit, onDelete }: OptionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1f2933]/80 hover:bg-[#374151] transition-all duration-200 shadow-sm hover:shadow-md border border-white/10 backdrop-blur-sm"
      >
        <BiDotsVerticalRounded className="w-5 h-5 text-white" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-[#0f172a] border border-white/10 shadow-xl py-1 z-30">
          <button
            onClick={onEdit}
            className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/10"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/10"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
