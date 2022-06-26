import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useDataContext } from "./context/DataContext";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Loading from "./components/Loading";

function App() {
  const data = useDataContext();
  const posts = data.posts;

  return (
    <div className="min-h-screen bg-gray-100 text-neutral-600 transition-all dark:bg-bgDarkest dark:text-light">
      <Navbar />
      {posts.length !== 0 || !posts ? (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path={`/r/:subId/comments/:postId/:postTitle`} element={<PostPage />} />
        </Routes>
      ) : (
        <div className="flex h-screen items-center justify-center pb-40">
          {" "}
          <Loading />
        </div>
      )}
    </div>
  );
}

export default App;
