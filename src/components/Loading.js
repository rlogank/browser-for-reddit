import { useDataContext } from "../context/DataContext";
import LoadingIcons from "react-loading-icons";
import { FaSmileBeam } from "react-icons/fa";

const Loading = () => {
  const data = useDataContext();
  const bottomMessage = data.bottomMessage;

  return (
    <div className="mb-20 flex items-center justify-center">
      <button className="flex flex-col items-center justify-center text-sm text-gray-400">
        {bottomMessage !== "Shut up." ? (
          <>
            <LoadingIcons.Grid width="40px" fill="#9CA3AF" /> {bottomMessage}
          </>
        ) : (
          <>
            <FaSmileBeam className="mb-5 animate-spin text-5xl" /> Weeeeeeeee
          </>
        )}
      </button>
    </div>
  );
};

export default Loading;
