import React from "react";
import { FaExclamation, FaRedditAlien } from "react-icons/fa";

const Hero = ({ setShowHero }) => {
  return (
    <div className="flex flex-col items-start gap-5 px-5">
      <h2 className="pr-2 text-4xl font-bold tracking-tight">
        In with the{" "}
        <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
          positive
        </span>
        .
      </h2>

      <h2 className="text-lgl font-light lg:w-1/2">
        Filter out online negativity with one click. Many people don't realize how they're being impacted by
        habitually consuming negative online content. Our algorithms give you the power to <em>see</em> which
        content could be impacting you - and allow you to obliterate it.
      </h2>
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex cursor-pointer select-none items-center gap-2.5 rounded-md bg-bgDark px-2.5 py-2 text-sm hover:text-white active:bg-bgDarker">
          <FaRedditAlien className="" /> Sign in with Reddit
        </div>
        <div
          onClick={() => {
            setShowHero(false);
          }}
          className="flex cursor-pointer select-none items-center gap-2.5 rounded-md bg-bgDark px-2.5 py-2 text-sm hover:text-white active:bg-bgDarker"
        >
          <FaExclamation className="reverse" /> Don't show me this again
        </div>
      </div>
    </div>
  );
};

export default Hero;
