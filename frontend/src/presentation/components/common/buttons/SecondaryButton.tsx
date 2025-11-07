import React from "react";

interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
  width?: string; // Tailwind width classes or custom CSS width e.g. "w-48" or "100px"
  height?: string; // Tailwind height classes or custom CSS height e.g. "py-2" or "50px"
  className?: string; // optional additional classes
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  onClick,
  width = "w-full",
  height = "py-2",
  className = "",
}) => {
  const styleClasses = `${width} ${height} bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${className} cursor-pointer`;

  return (
    <button className={styleClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default SecondaryButton;
