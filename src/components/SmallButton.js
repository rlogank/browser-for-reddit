import React from "react";

const SmallButton = ({ icon, action, text, color }) => {
  return (
    <button
      onClick={action}
      className="mr-auto flex items-center gap-1.5 rounded-md bg-gray-100 p-2 text-sm dark:bg-bgDarker"
    >
      {icon}
      {text && (
        <div
          className={`text-[0.65rem] leading-3 ${color} flex flex-nowrap items-center gap-1.5 whitespace-nowrap`}
        >
          {text}
        </div>
      )}
    </button>
  );
};

export default SmallButton;
