import clsx from "clsx";

const FilterButton = ({ text, icon, action, state }) => {
  return (
    <button
      onClick={action}
      className={clsx(
        "dark:hover:bg-opacity-85 flex items-center gap-1.5 rounded-md bg-bgDark px-3.5 py-2  text-sm transition hover:bg-opacity-80 hover:text-white dark:active:bg-opacity-80",
        state ? "bg-opacity-80 text-white" : "text-gray-400"
      )}
    >
      <span className={clsx("mt-px text-xs", state && "text-emerald-400")}>{icon}</span>
      {text}
    </button>
  );
};

export default FilterButton;
