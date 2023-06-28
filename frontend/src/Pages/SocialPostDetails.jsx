import React, { useRef, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorToast from "../Components/ErrorToast";
import { useAuth } from "../Context/AuthContext";
import { useGetAllCommentsQuery, useGetSinglePostQuery } from "../services/postsApi";
import { Faq } from "../Components/FAQ";

const SocialPostDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const postDetails = location.state?.data;

  const toastRef = useRef();

  const [errorMessage, setErrorMessage] = useState();
  const [submitComment, setSubmitComment] = useState(false);
  const [PostComment, setPostComment] = useState(null);

  const {
    data: postData,
    error: fetchPostError,
    isLoading: fetchPostLoading,
    refetch: refetchPostData
  } = useGetSinglePostQuery(postDetails?.id);

  console.log("single post data", postData);

  // getComemnts
  const { data, error, isLoading, isSuccess, refetch } = useGetAllCommentsQuery(postDetails?.id);

  async function handleSubmit(comment) {
    try {
      setSubmitComment(true);

      if (typeof comment !== "string" || comment.length === 0) {
        throw new Error("Please write a comment!");
      }

      const res = await fetch("/api/post/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          body: comment,
          postId: postDetails?.id,
          userId: currentUser?.uid
        })
      });

      const commentDetails = await res.json();

      if (commentDetails.hasOwnProperty("message")) {
        throw new Error(commentDetails?.message);
      }

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      refetch();

      setSubmitComment(false);
    } catch (error) {
      setSubmitComment(false);
      setErrorMessage(error.message);
      toastRef.current.show();
    }
  }

  async function handlePostUpvote(postId) {
    try {
      if (typeof postId !== "string") {
        throw new Error("Something went wrong! please try again");
      }
      const res = await fetch("https://api-6tyd64odzq-uc.a.run.app/api/post/reaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postId,
          userId: currentUser?.uid,
          type: "UPVOTE"
        })
      });

      const upvoteRes = await res.json();
      console.log("submit post", upvoteRes);

      if (upvoteRes.hasOwnProperty("message")) {
        throw new Error(upvoteRes?.message);
      }

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      refetchPostData();
    } catch (error) {
      setErrorMessage(error.message);
      toastRef.current.show();
    }
  }

  async function handlePostDownvote(postId) {
    try {
      if (typeof postId !== "string") {
        throw new Error("Something went wrong! please try again");
      }
      const res = await fetch("https://api-6tyd64odzq-uc.a.run.app/api/post/reaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postId,
          userId: currentUser?.uid,
          type: "DOWNVOTE"
        })
      });

      const downvoteRes = await res.json();
      console.log("submit post", downvoteRes);

      if (downvoteRes.hasOwnProperty("message")) {
        throw new Error(downvoteRes?.message);
      }

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      refetchPostData();
    } catch (error) {
      setErrorMessage(error.message);
      toastRef.current.show();
    }
  }

  async function handleCommentUpvote(commentId) {
    try {
      if (typeof commentId !== "string") {
        throw new Error("Something went wrong! please try again");
      }
      const res = await fetch("https://api-6tyd64odzq-uc.a.run.app/api/post/comment/reaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          commentId,
          userId: currentUser?.uid,
          type: "UPVOTE"
        })
      });

      const upvoteRes = await res.json();
      console.log("submit post", upvoteRes);

      if (upvoteRes.hasOwnProperty("message")) {
        throw new Error(upvoteRes?.message);
      }

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      refetch();
    } catch (error) {
      setErrorMessage(error.message);
      toastRef.current.show();
    }
  }

  async function handleCommentDownvote(commentId) {
    try {
      if (typeof commentId !== "string") {
        throw new Error("Something went wrong! please try again");
      }
      const res = await fetch("https://api-6tyd64odzq-uc.a.run.app/api/post/comment/reaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          commentId,
          userId: currentUser?.uid,
          type: "DOWNVOTE"
        })
      });

      const downvoteRes = await res.json();
      console.log("submit post", downvoteRes);

      if (downvoteRes.hasOwnProperty("message")) {
        throw new Error(downvoteRes?.message);
      }

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      refetch();
    } catch (error) {
      setErrorMessage(error.message);
      toastRef.current.show();
    }
  }

  return (
    <main className="flex items-start gap-8 lg:px-4 py-2 lg:py-8  mx-auto  max-w-[1600px]">
      <ErrorToast message={errorMessage} ref={toastRef} />

      <div className="bg-[#1a1a1b] max-w-[800px] p-4 rounded-md">
        <div className="flex gap-x-4 items-start">
          {/* upvote & downvote section */}
          <div className="flex flex-col justify-center items-center">
            <BiUpvote
              onClick={() => handlePostUpvote(postData?.id)}
              className="text-gray-300 w-6 h-6 cursor-pointer"
            />
            <p className="text-gray-400 my-1">
              {postData?.VotePost?.reduce((acc, currentVal) => acc + currentVal?.voting, 0)}
            </p>
            <BiDownvote
              onClick={() => handlePostDownvote(postData?.id)}
              className="text-gray-300 w-6 h-6  cursor-pointer"
            />
          </div>
          {/* post title and description */}
          <div>
            <h1 className="text-white text-3xl font-semibold ">{postDetails?.title}</h1>
            <p className="text-gray-300 pt-2">{postDetails?.body}</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(PostComment);
          }}
          className="mt-4"
        >
          <div className="w-full mb-4 border  rounded-lg bg-gray-700 border-gray-600">
            <div className="px-4 py-2  rounded-t-lg bg-gray-800">
              <label for="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="4"
                value={PostComment}
                onChange={(e) => setPostComment(e.target.value)}
                className="w-full px-0 text-sm  border-0 bg-gray-800 focus:ring-0 text-white placeholder-gray-400"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                {submitComment ? "Adding your comment..." : "Post Comment"}
              </button>
            </div>
          </div>
        </form>

        <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          Remember, contributions to this topic should follow our{" "}
          <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
            Community Guidelines
          </a>
          .
        </p>

        <div className="border-b-2 border-gray-400 pt-4 "></div>

        {/* loader for comments */}
        {isLoading || !isSuccess ? (
          <div className="">
            {[...Array(5).keys()].map((idx) => (
              <div key={idx} className="flex items-start gap-x-4 my-8 ">
                {/* upvote & downvote section */}
                <div className="flex flex-col justify-center items-center">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2 my-2"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                </div>
                {/* comment */}
                <div>
                  {/* user */}
                  <div className="flex align-center gap-x-1">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>

                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8 "></div>
                  </div>

                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px] lg:w-[400px] mt-2"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[200px] lg:w-[400px] mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {console.log(data)}
            {/* comments */}
            {data?.map((comment, idx) => (
              <div key={comment?.id} className="flex items-start gap-x-4 my-4">
                {/* upvote & downvote section */}
                <div className="flex flex-col justify-center items-center">
                  <BiUpvote
                    onClick={() => handleCommentUpvote(comment?.id)}
                    className="text-gray-300 w-4 h-4 cursor-pointer"
                  />
                  <p className="text-gray-400 my-1">
                    {comment?.VoteComment?.reduce((acc, currentVal) => acc + currentVal?.voting, 0)}
                  </p>
                  <BiDownvote
                    onClick={() => handleCommentDownvote(comment?.id)}
                    className="text-gray-300 w-4 h-4 cursor-pointer"
                  />
                </div>
                {/* comment */}
                <div>
                  {/* user */}
                  <div className="flex align-center">
                    <img
                      src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${comment?.user?.name}&mouth=cute,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                      alt="profile pic of user"
                      className="w-6 h-6 rounded-full dark:bg-gray-500"
                    />
                    <p className="text-white pl-1 font-bold">{comment?.user?.name}</p>
                  </div>

                  <p className="text-gray-300 pt-1">{comment?.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/*  */}
      <section className="hidden lg:block">
        {/* card to welcome folks to stonks social */}

        {/* stonks faq */}
        <div className="hidden lg:block max-w-sm  p-6  rounded-lg shadow bg-[#1a1a1b] border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">Rules</h5>

          <Faq title="No spam or self-promotion">
            Spam, ads, solicitations (including referral links), and self-promotion posts or
            comments will be removed and you might get banned. Instead, advertise here.
          </Faq>

          <Faq title="Context and Effort">
            Context and effort must be provided; empty posts or empty posts with links will be
            automatically removed. Low effort mentions for meme stocks will be removed, see here.
          </Faq>

          <Faq title="No trolling, insulting, or harassing">
            Trolling, insults, or harassment, especially in posts requesting advice, will be
            removed.
          </Faq>

          <Faq title="No penny stock or OTC discussions">
            No penny stock discussions, including OTC, microcaps, pump & dumps, low vol pumps and
            SPACs.
          </Faq>

          <Faq title="Stay on topic">
            Almost any post related to stocks and investment is welcome on stonks, including pre IPO
            news, futures & forex related to stocks, and geopolitical or corporate events indicating
            risks; outside this is offtopic and can be removed.
          </Faq>
        </div>
      </section>
    </main>
  );
};

export default SocialPostDetails;
