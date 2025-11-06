import React from "react";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  width?: string; // Tailwind width classes or custom CSS width e.g. "w-24" or "100px"
  height?: string; // Tailwind height classes or custom CSS height e.g. "h-12" or "50px"
  className?: string; // optional additional classes
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onClick,
  width = "w-full",
  height = "py-2",
  className = "",
}) => {
  const styleClasses = `${width} ${height} bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${className} cursor-pointer`;

  return (
    <button className={styleClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
