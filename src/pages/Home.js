import { useState } from "react";
import Hero from "../components/Hero";
import PostList from "../components/PostList";

const Home = () => {
  const [showHero, setShowHero] = useState(true);

  return (
    <>
      {showHero && (
        <div className="mb-16 w-full bg-black bg-opacity-10 py-20">
          <div className="mx-auto w-full max-w-screen-2xl">
            <Hero setShowHero={setShowHero} />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-screen-2xl">
        <PostList />
      </div>
    </>
  );
};

export default Home;
