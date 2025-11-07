import React from "react";

interface DangerButtonProps {
  text: string;
  onClick?: () => void;
  width?: string;  // Tailwind width classes or custom CSS e.g. "w-24"
  height?: string; // Tailwind height classes or custom CSS e.g. "py-2"
  className?: string;
}

const DangerButton: React.FC<DangerButtonProps> = ({
  text,
  onClick,
  width = "w-full",
  height = "py-2",
  className = "",
}) => {
  const styleClasses = `${width} ${height} bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ${className} cursor-pointer`;

  return (
    <button className={styleClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default DangerButton;
