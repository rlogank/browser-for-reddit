import { useDataContext } from "../context/DataContext";
import { FaBars, FaCog, FaEye, FaRedditAlien } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const data = useDataContext();
  const setSubreddit = data.setSubreddit;
  return (
    <div className="flex items-center border-b bg-white dark:border-borderDark dark:bg-bgDark h-[56px]">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5">
        <Link
          to="/"
          onClick={() => {
            setSubreddit("popular");
          }}
        >
          <h1 className="flex items-center gap-1.5 font-semibold tracking-tight">
            <FaEye />
            <span>
              Browser <span className="font-light">for Reddit</span>
            </span>
          </h1>
        </Link>
        <div className="cursor-pointer select-none rounded-md bg-bgDarker p-2.5 text-sm hover:text-white active:bg-bgDarkest md:hidden">
          <FaBars className="" />
        </div>
        <div className="hidden gap-2.5 py-2.5 md:flex">
          <div className="flex cursor-pointer select-none items-center gap-2.5 rounded-md bg-bgDarker px-2.5 py-2 text-sm hover:text-white active:bg-bgDarkest">
            <FaRedditAlien className="" /> Sign in with Reddit
          </div>
          <div className="flex cursor-pointer select-none items-center gap-2.5 rounded-md bg-bgDarker px-2.5 py-2 text-sm hover:text-white active:bg-bgDarkest">
            <FaCog className="" /> Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
