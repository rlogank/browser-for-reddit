import Post from "./Post";
import { useDataContext } from "../context/DataContext";
import { useState } from "react";
import Filter from "./Filter";
import FeaturedPosts from "./FeaturedPosts";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Loading from "./Loading";

const PostList = () => {
  const [loading, setLoading] = useState(false);
  const data = useDataContext();
  const posts = data.posts;
  const subreddit = data.subreddit;

  return (
    <div className="mt-5 flex flex-col gap-5">
      <Filter />
      <div className="flex flex-col divide-y divide-borderDark lg:hidden">
        {posts != null
          ? posts.map((post, index) => {
              return <Post key={index} post={post.data} setLoading={setLoading} />;
            })
          : "Loading"}
      </div>
      <div className="hidden md:px-5 lg:block">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1300: 3 }}>
          <Masonry gutter="20px">
            {posts != null
              ? posts.map((post, index) => {
                  return <Post key={index} post={post.data} setLoading={setLoading} />;
                })
              : "Loading"}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <Loading />
    </div>
  );
};

export default PostList;
