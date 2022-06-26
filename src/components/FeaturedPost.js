import { useDataContext } from "../context/DataContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const FeaturedPost = ({ post }) => {
  const data = useDataContext();
  const posts = data.posts;
  const [setPostsWithImages] = useState([]);
  const [hoverFx, setHoverFx] = useState(false);

  useEffect(() => {
    setPostsWithImages(posts.filter((post) => post.data.url.includes(".jpg")));
  }, [posts]);

  return (
    <div
      onMouseOver={() => setHoverFx(true)}
      onMouseLeave={() => setHoverFx(false)}
      className="relative overflow-hidden rounded-md"
    >
      <Link to={post.data.permalink}>
        <div className="absolute bottom-0 z-20 w-full p-5 text-sm">
          <h3 className="truncate text-white">{post.data.title}</h3>
          <h4 className="truncate text-xs">r/{post.data.subreddit}</h4>
        </div>
        <span className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent to-black opacity-80"></span>
        <img
          className={clsx(
            "absolute h-52 w-full object-cover brightness-75 transition",
            hoverFx && "brightness-90"
          )}
          src={post.data.url.includes(".jpg") ? post.data.url : post.data.thumbnail}
        />
      </Link>
    </div>
  );
};

export default FeaturedPost;
