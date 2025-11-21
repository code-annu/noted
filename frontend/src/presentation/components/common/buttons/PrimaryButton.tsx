import React from "react";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  width?: string; // Tailwind width classes or custom CSS width e.g. "w-24" or "100px"
  height?: string; // Tailwind height classes or custom CSS height e.g. "h-12" or "50px"
  className?: string; // optional additional classes
  disabled?: boolean; // new prop for disabled state
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onClick,
  width = "w-full",
  height = "py-2",
  className = "",
  disabled = false,
}) => {
  const styleClasses = `
    ${width} ${height} rounded-md transition-colors 
    ${
      disabled
        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
    }
    ${className}
  `;

  return (
    <button
      className={styleClasses.trim().replace(/\s+/g, " ")}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
