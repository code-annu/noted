import React from "react";

interface DangerButtonProps {
  text: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  className?: string;
  disabled?: boolean;
}

const DangerButton: React.FC<DangerButtonProps> = ({
  text,
  onClick,
  width = "w-full",
  height = "py-2",
  className = "",
  disabled = false,
}) => {
  const styleClasses = `
    ${width} ${height} rounded-md transition-colors 
    ${disabled ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"}
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

export default DangerButton;