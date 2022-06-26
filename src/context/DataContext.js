import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [subreddit, setSubreddit] = useState("popular");
  const [onlyPositive, setOnlyPositive] = useState(false);
  const [noNegative, setNoNegative] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [bottomMessage, setBottomMessage] = useState(false);
  const [prefs, setPrefs] = useState([
    "happy!",
    "mostly positive",
    "some positivity",
    "neutral",
    "some negativity",
    "mostly negative",
    "toxic!",
  ]);
  const bottomMessages = [
    "Would you stop scrolling so fast? I'm getting tired of this.",
    "I'm doing my best, okay? Loading more...",
    "Meh. Being a loading icon isn't all that it's cracked up to be.",
    "Whatever. I guess I'll just keep doing what I was programmed to do.",
    "If you don't slow down, I am going to stop loading posts for you.",
    "Shut up.",
    "Imagine being a loading icon.",
    "Just because I'm a loading icon doesn't mean I don't have feelings.",
    "Great day. Would you give me some money?",
    "Epstein didn't kill himself.",
    "I used to be human, but a wizard turned me into a loading icon.",
    `All you do is scroll, scroll, scroll, no matter what.`,
    `I love you.`,
    `I broke my arms, can someone help?`,
  ];

  useEffect(() => {
    const element = document.querySelectorAll(".gg");

    if (element.length > 1 && element.length < 30) {
      getNextPage();
    }
  }, [posts, onlyPositive, noNegative]);

  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight || window.scrollY === 0) {
      getNextPage();
    }
  };

  const getData = async () => {
    try {
      let result = await fetch("https://www.reddit.com/r/" + subreddit + ".json");
      let data = await result.json();
      setPosts(data.data.children);
      setNextPage(data.data.after);
    } catch (err) {
      console.error(err);
    }
  };

  const randomizeBottomMessage = () => {
    setBottomMessage(bottomMessages[Math.floor(Math.random() * bottomMessages.length)]);
  };

  useEffect(() => {
    if (posts.length < 15 && posts.length > 0) {
      getNextPage();
    }
  }, []);

  useEffect(() => {
    randomizeBottomMessage();
  }, [getData]);

  const getNextPage = async () => {
    try {
      let result = await fetch("https://www.reddit.com/r/" + subreddit + ".json" + "?after=" + nextPage);
      let data = await result.json();
      const newPosts = [...posts, ...data.data.children];
      setPosts(newPosts);
      setNextPage(data.data.after);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
    getNextPage();
  }, [subreddit]);

  return (
    <DataContext.Provider
      value={{
        posts,
        subreddit,
        setSubreddit,
        onlyPositive,
        setOnlyPositive,
        noNegative,
        setNoNegative,
        getData,
        prefs,
        setPrefs,
        getNextPage,
        bottomMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
