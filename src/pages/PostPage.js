import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [post, setPost] = useState(null);

  let { postId } = useParams();
  let { subId } = useParams();
  let { postTitle } = useParams();

  const getPost = async () => {
    try {
      const url = `https://www.reddit.com/r/${subId}/comments/${postId}/${postTitle}.json`;
      let result = await fetch(url);
      let data = await result.json();
      setPost(data[0].data.children[0].data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden text-sm text-grayed">
      Under Construction
    </div>
  );
};

export default PostPage;
