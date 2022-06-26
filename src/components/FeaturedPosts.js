import { useDataContext } from "../context/DataContext";
import { useEffect, useState } from "react";
import FeaturedPost from "./FeaturedPost";

const FeaturedPosts = () => {
  const data = useDataContext();
  const posts = data.posts;
  const [postsWithImages, setPostsWithImages] = useState([]);

  useEffect(() => {
    setPostsWithImages(posts.filter((post) => post.data.url.includes(".jpg")));
  }, [posts]);

  return (
    <div className="hidden h-52 grid-cols-6 gap-5 px-5 lg:grid">
      {postsWithImages.slice(0, 6).map((post) => {
        return <FeaturedPost post={post} />;
      })}
    </div>
  );
};

export default FeaturedPosts;
