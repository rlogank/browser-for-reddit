import { FaCheck, FaFire, FaMedal, FaStar, FaTimes } from "react-icons/fa";
import { useDataContext } from "../context/DataContext";
import FilterButton from "./FilterButton";
import { DebounceInput } from "react-debounce-input";

const Filter = () => {
  const data = useDataContext();
  const subreddit = data.subreddit;
  const setSubreddit = data.setSubreddit;
  const setOnlyPositive = data.setOnlyPositive;
  const setNoNegative = data.setNoNegative;
  const onlyPositive = data.onlyPositive;
  const noNegative = data.noNegative;
  const getNextPage = data.getNextPage;

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      getNextPage();
    }
  };

  return (
    <div className="flex w-full flex-wrap justify-between gap-2.5 px-5">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 rounded-md bg-white bg-opacity-80 px-3.5 py-2 text-sm dark:bg-bgDark dark:text-white">
          <FaFire className="mt-px text-xs" />
          Hot
        </div>
        <div className="flex items-center gap-1.5 rounded-md bg-white px-3.5 py-2 text-sm transition hover:text-white dark:bg-bgDark dark:text-gray-400">
          <FaStar className="mt-px text-xs" />
          New
        </div>
        <div className="flex items-center gap-1.5 rounded-md bg-white px-3.5 py-2 text-sm transition hover:text-white dark:bg-bgDark dark:text-gray-400">
          <FaMedal className="mt-px text-xs" />
          Top
        </div>
        <span className="flex">
          <div
            className="
          flex items-center gap-1.5 rounded-l-md bg-white px-3.5 py-2 text-sm transition hover:text-white dark:bg-bgDark dark:bg-opacity-75 dark:text-gray-400"
          >
            r/
          </div>
          <DebounceInput
            minLength={3}
            debounceTimeout={500}
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            className="
            flex w-full items-center gap-1.5 rounded-r-md bg-white px-3.5 py-2 text-sm outline-none transition hover:text-white dark:bg-bgDark dark:text-gray-400"
          />
        </span>
      </div>

      <div className="relative flex gap-2.5">
        <FilterButton
          icon={<FaCheck />}
          color=""
          text="Only Positive"
          state={onlyPositive}
          action={() => {
            setOnlyPositive(!onlyPositive);
          }}
        />
        <FilterButton
          icon={<FaTimes />}
          color=""
          text="No Negative"
          state={noNegative}
          action={() => {
            setNoNegative(!noNegative);
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
