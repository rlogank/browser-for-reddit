import React from "react";
import { useDataContext } from "../context/DataContext";

const SubHeader = () => {
  const data = useDataContext();
  const subreddit = data.subreddit;

  return (
    <div className="flex h-[100px] items-center justify-center bg-bgDarker p-5">
      <h3 className="text-3xl font-medium">r/ {subreddit}</h3>
    </div>
  );
};

export default SubHeader;
