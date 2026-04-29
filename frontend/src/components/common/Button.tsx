import React from "react";
import clsx from "clsx";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  icon,
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-[var(--color-purple)] text-white shadow-lg shadow-[rgba(139,92,246,0.18)] hover:bg-[var(--color-purple-dark)]",
    secondary:
      "border-2 border-[var(--color-blue)] text-[var(--color-blue)] hover:bg-[rgba(0,212,255,0.1)]",
    outline:
      "border border-[var(--color-blue)] text-[var(--color-blue)] hover:bg-[var(--color-blue)] hover:text-[#07101a]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variantStyles[variant], className)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
