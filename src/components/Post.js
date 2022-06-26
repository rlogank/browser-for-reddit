import clsx from "clsx";
import { FaBars, FaChevronUp, FaComment } from "react-icons/fa";
import SmallButton from "./SmallButton";
import { useEffect, useState } from "react";
import Sentiment from "sentiment";
import { useDataContext } from "../context/DataContext";
import { Link } from "react-router-dom";

const Post = (props) => {
  const [postComments, setPostComments] = useState([]);
  const [sentimentValue, setSentimentValue] = useState(0);
  const [showSentiment, setShowSentiment] = useState(true);
  const [posFactors, setPosFactors] = useState([]);
  const [negFactors, setNegFactors] = useState([]);
  const data = useDataContext();
  const score = props.post.score;
  const onlyPositive = data.onlyPositive;
  const noNegative = data.noNegative;
  const sentiment = new Sentiment();

  const getComments = async () => {
    try {
      let result = await fetch("https://www.reddit.com" + props.post.permalink + ".json?limit=10", {});
      let data = await result.json();
      setPostComments(data[1].data.children);
      localStorage.setItem("postComments", JSON.stringify(data[1].data.children));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getComments();
  }, [props.post]);

  useEffect(() => {
    const eachComment = postComments.map((comment) => {
      return sentiment.analyze(comment.data.body);
    });
    const average =
      eachComment.reduce((acc, curr) => {
        return acc + curr.score;
      }, 0) / eachComment.length;
    setPosFactors(
      eachComment
        .flatMap((comment) => {
          return comment.positive;
        })
        .reduce(function (a, b) {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, [])
    );
    setNegFactors(
      eachComment
        .flatMap((comment) => {
          return comment.negative;
        })
        .reduce(function (a, b) {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, [])
    );
    setSentimentValue(parseFloat(average).toFixed(2));
  }, [postComments]);

  const sentimentEval = () => {
    if (sentimentValue < -3) {
      return <SmallButton text={sentimentValue} color="text-rose-400" />;
    } else if (sentimentValue < -2) {
      return <SmallButton text={sentimentValue} color="text-orange-300" />;
    } else if (sentimentValue < -1) {
      return <SmallButton text={sentimentValue} color="text-amber-200" />;
    } else if (sentimentValue < 0.5) {
      return <SmallButton text={sentimentValue} color="text-gray-400" />;
    } else if (sentimentValue < 1) {
      return <SmallButton text={sentimentValue} color="text-lime-300" />;
    } else if (sentimentValue < 2) {
      return <SmallButton text={sentimentValue} color="text-green-300" />;
    } else if (sentimentValue < 100) {
      return <SmallButton text={sentimentValue} color="text-sky-300" />;
    }
  };

  const sentimentLocale = () => {
    if (sentimentValue < -3) {
      return <span className="text-rose-400">are toxic!</span>;
    } else if (sentimentValue < -2) {
      return <span className="text-orange-300">are mostly negative.</span>;
    } else if (sentimentValue < -1) {
      return <span className="text-amber-200">have some negativity.</span>;
    } else if (sentimentValue < 0.5) {
      return <span className="text-gray-400">are neutral.</span>;
    } else if (sentimentValue < 1) {
      return <span className="text-lime-300">have some positivity.</span>;
    } else if (sentimentValue < 2) {
      return <span className="text-green-300">are mostly positive.</span>;
    } else if (sentimentValue < 100) {
      return <span className="text-sky-300">are happy!</span>;
    } else {
      return (
        <span className="text-gray-400">don't exist, and may not ever exist. Let's hope for the best.</span>
      );
    }
  };

  if (sentimentEval !== undefined && sentimentValue)
    return (
      <article
        id="post"
        className={clsx(
          "inline-flex w-full flex-col justify-start gap-5 self-start bg-white p-5 dark:bg-bgDark lg:rounded-md",
          onlyPositive && sentimentValue <= 0.5 && "gg hidden",
          (noNegative || onlyPositive) && props.post.num_comments <= 1 && "gg hidden",
          noNegative && sentimentValue <= 0 && "gg hidden"
        )}
      >
        <div className="flex w-full gap-5">
          {props.post.thumbnail.includes("http") ? (
            <div className="flex h-[60px] w-[60px] shrink-0 grow-0 overflow-hidden rounded-md shadow-md md:h-[107px] md:w-[107px]">
              <img src={props.post.thumbnail} alt={props.post.title} className="object-cover" />
            </div>
          ) : (
            <div className="flex aspect-square h-[60px] w-[60px]  items-center justify-center rounded-md bg-gray-100 text-xl text-gray-400 dark:bg-bgDarker md:h-[107px] md:w-[107px]">
              <FaBars />
            </div>
          )}

          <div className="flex w-full flex-col justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="text-xs font-light text-gray-400">{"r/" + props.post.subreddit}</div>
              <Link to={props.post.permalink}>
                <h3 className="text-sm line-clamp-2 sm:text-base md:text-sm lg:text-base">
                  {props.post.title}
                </h3>
              </Link>
            </div>
            <div className="mt-2.5 flex w-full items-center justify-between md:mt-0">
              <div className="flex gap-2.5">
                <SmallButton icon={<FaComment />} text={props.post.num_comments.toLocaleString("en-US")} />
                <div
                  onClick={() => {
                    setShowSentiment(!showSentiment);
                  }}
                  className="flex items-center text-gray-400"
                  title={"Avg comment sentiment: " + sentimentValue}
                >
                  {sentimentEval()}
                </div>
              </div>
              <div className="flex w-full items-center justify-end gap-2.5">
                <span className={clsx("text-[0.7rem]", score === 0 && "text-gray-400")}>
                  {props.post.score.toLocaleString("en-US")}
                </span>
                <div className="flex justify-end">
                  <SmallButton icon={<FaChevronUp />} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSentiment && (
          <div className="flex flex-col gap-2.5 rounded-md bg-bgDarker p-5">
            <h4 className="text-sm">This thread's comments {sentimentLocale()}</h4>
            <div className="flex flex-wrap gap-2.5 text-sm">
              {sentimentValue > 0
                ? posFactors.map((p) => {
                    return <div className="rounded-md bg-bgDark px-2.5 py-1">{p}</div>;
                  })
                : negFactors.map((n) => {
                    return <div className="rounded-md bg-bgDark px-2.5 py-1">{n}</div>;
                  })}
            </div>
          </div>
        )}
      </article>
    );
};

export default Post;
